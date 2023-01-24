import React, { useRef } from 'react';
import { Image, StyleSheet, Text, View } from "react-native";
import Animated, {
    Extrapolation,
    interpolate,
    runOnJS,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withTiming
} from 'react-native-reanimated';
import { connector, ReduxProps } from "../../stores";
import { SharedElement, SharedElementCompatRoute } from "react-navigation-shared-element";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../../App";
import { COLORS, FONTS, SIZES } from "../../constants";
import IconButton from "../../components/IconButton";
import icons from "../../constants/icons";
import images from "../../constants/images";
import dummyData from "../../constants/dummyData";
import HorizontalCourseCard from "../../components/HorizontalCourseCard";
import LineDivider from "../../components/LineDivider";
import { FlatList } from "react-native-gesture-handler";
import FilterModal from "../../components/FilterModal";
import { Course } from "../../utils/types";

type CourseListingProps = ReduxProps & StackScreenProps<RootStackParamList, 'CourseListing'>

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

const HEADER_HEIGHT = 250

const CourseListing = ({ appTheme, navigation, route }: CourseListingProps) => {
    const { category, sharedElementPrefix } = route.params

    const flatListRef = useRef<any>()
    const scrollY = useSharedValue(0)
    const onScroll = useAnimatedScrollHandler(e => scrollY.value = e.contentOffset.y)
    const inputRange = [0, HEADER_HEIGHT - 50]
    const headerSharedValue = useSharedValue(80)
    const filterModalShareValue1 = useSharedValue(SIZES.height)
    const filterModalShareValue2 = useSharedValue(SIZES.height)

    headerSharedValue.value = withDelay(500, withTiming(0, { duration: 500 }))

    const headerFadeAnimatedStyle = useAnimatedStyle(() => ({
        opacity: interpolate(headerSharedValue.value, [80, 0], [0, 1])
    }))
    const headerTranslateAnimatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: headerSharedValue.value }]
    }))
    const headerHeightAnimatedStyle = useAnimatedStyle(() => ({
        height: interpolate(scrollY.value, inputRange, [HEADER_HEIGHT, 120], Extrapolation.CLAMP)
    }))
    const headerHeightOnScrollAnimatedStyle = useAnimatedStyle(() => ({
        opacity: interpolate(scrollY.value, [80, 0], [0, 1], Extrapolation.CLAMP),
        transform: [{ translateY: interpolate(scrollY.value, inputRange, [0, 200], Extrapolation.CLAMP) }]
    }))
    const headerShowOnScrollAnimatedStyle = useAnimatedStyle(() => ({
        opacity: interpolate(scrollY.value, [80, 0], [1, 0], Extrapolation.CLAMP),
        transform: [{ translateY: interpolate(scrollY.value, inputRange, [51, 130], Extrapolation.CLAMP) }]
    }))

    return (
        <View style={{ flex: 1, backgroundColor: appTheme.backgroundColor1 }}>
            {/*Results*/}
            <AnimatedFlatList ref={flatListRef} data={dummyData.courses_list_2}
                              keyExtractor={item => `results-${(item as Course).id}`}
                              contentContainerStyle={{ paddingHorizontal: SIZES.padding }}
                              showsHorizontalScrollIndicator={false} scrollEventThrottle={16}
                              keyboardDismissMode={'on-drag'} onScroll={onScroll}
                              ListHeaderComponent={
                                  <View style={{
                                      flexDirection: 'row',
                                      alignItems: 'center',
                                      marginTop: 270,
                                      marginBottom: SIZES.base
                                  }}>
                                      {/*Results*/}
                                      <Text style={{ flex: 1, ...FONTS.body3 }}>5,761 Results</Text>

                                      <IconButton icon={icons.filter} iconStyle={{ width: 20, height: 20 }}
                                                  containerStyle={{
                                                      width: 40,
                                                      height: 40,
                                                      alignItems: 'center',
                                                      justifyContent: 'center',
                                                      borderRadius: 10,
                                                      backgroundColor: COLORS.primary
                                                  }} onPress={() => {
                                          filterModalShareValue1.value = withTiming(0, { duration: 100 })
                                          filterModalShareValue2.value = withDelay(100, withTiming(0, { duration: 500 }))
                                      }}/>
                                  </View>
                              } renderItem={({ item, index: i }) => (
                <HorizontalCourseCard course={item as Course} containerStyle={{
                    marginVertical: SIZES.padding,
                    marginTop: i == 0 ? SIZES.padding : SIZES.radius
                }} onPress={() => navigation.navigate('CourseDetails', { course: item as Course })}/>
            )} ItemSeparatorComponent={() => (
                <LineDivider lineStyle={{ backgroundColor: COLORS.gray20 }}/>
            )}/>

            {/*Header*/}
            <Animated.View style={[{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 250,
                overflow: 'hidden'
            }, headerHeightAnimatedStyle]}>
                <SharedElement id={`${sharedElementPrefix}-category-card-bg-${category?.id}`}
                               style={[StyleSheet.absoluteFillObject]}>
                    <Image source={category?.thumbnail} resizeMode={'cover'}
                           style={{ height: '100%', width: '100%', borderBottomLeftRadius: 60 }}/>
                </SharedElement>

                <Animated.View
                    style={[{ position: 'absolute', top: -80, left: 0, right: 0 }, headerShowOnScrollAnimatedStyle]}>
                    <Text style={{ textAlign: 'center', color: COLORS.white, ...FONTS.h2 }}>{category.title}</Text>
                </Animated.View>

                <Animated.View
                    style={[{ position: 'absolute', bottom: 70, left: 30 }, headerHeightOnScrollAnimatedStyle]}>
                    <SharedElement id={`${sharedElementPrefix}-category-card-title-${category.id}`}
                                   style={[StyleSheet.absoluteFillObject]}>
                        <Text style={{ position: 'absolute', color: COLORS.white, ...FONTS.h1 }}>{category.title}</Text>
                    </SharedElement>
                </Animated.View>

                <Animated.View style={headerFadeAnimatedStyle}>
                    <IconButton icon={icons.back} iconStyle={{ tintColor: COLORS.black }} containerStyle={{
                        position: 'absolute',
                        top: 40,
                        left: 20,
                        width: 50,
                        height: 50,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 25,
                        backgroundColor: COLORS.white
                    }} onPress={() => {
                        if (scrollY.value > 0 && scrollY.value <= 200) {
                            flatListRef.current?.scrollToOffset({
                                offset: 0,
                                animated: true
                            })

                            setTimeout(() => {
                                headerSharedValue.value = withTiming(80, {
                                    duration: 500
                                }, () => runOnJS(navigation.goBack)())
                            }, 100)
                        } else {
                            navigation.goBack()
                        }
                    }}/>
                </Animated.View>

                {/*Category Image*/}
                <Animated.Image source={images.mobile_image} resizeMode={'contain'}
                                style={[{
                                    position: 'absolute',
                                    right: 40,
                                    bottom: -40,
                                    width: 100,
                                    height: 200
                                },
                                    headerFadeAnimatedStyle,
                                    headerTranslateAnimatedStyle,
                                    headerHeightOnScrollAnimatedStyle
                                ]}/>
            </Animated.View>

            <FilterModal shareValue1={filterModalShareValue1} shareValue2={filterModalShareValue2}/>
        </View>
    );
};

CourseListing.sharedElements = (route: SharedElementCompatRoute, otherRoute: SharedElementCompatRoute) => {
    if (otherRoute.name === 'Dashboard') {
        const { category, sharedElementPrefix } = route.params

        return [
            { id: `${sharedElementPrefix}-category-card-bg-${category.id}` },
            { id: `${sharedElementPrefix}-category-card-title-${category.id}` }
        ]
    }
}

export default connector(CourseListing);