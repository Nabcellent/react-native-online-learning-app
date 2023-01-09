import React, { useRef } from 'react';
import { Image, Text, TextInput, View } from 'react-native';
import { COLORS, FONTS, SIZES } from "../../constants";
import dummyData from "../../constants/dummyData";
import TextButton from "../../components/TextButton";
import { FlatList } from 'react-native-gesture-handler';
import CategoryCard from "../../components/CategoryCard";
import Animated, {
    Extrapolation,
    interpolate,
    SharedValue,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue
} from 'react-native-reanimated'
import { Shadow } from "react-native-shadow-2";
import icons from "../../constants/icons";
import { connector, ReduxProps } from '../../stores';
import { SelectedThemeType } from "../../constants/theme";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../App";

const SearchBar = ({ scrollY, appTheme }: { scrollY: SharedValue<number>, appTheme:SelectedThemeType }) => {
    const inputRange = [0, 55]
    const searchBarAnimatedStyle = useAnimatedStyle(() => ({
        height: interpolate(scrollY.value, inputRange, [55, 0], Extrapolation.CLAMP),
        opacity: interpolate(scrollY.value, inputRange, [1, 0], Extrapolation.CLAMP)
    }))

    return (
        <Animated.View
            style={[{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 50,
                height: 50,
                paddingHorizontal: SIZES.padding
            }, searchBarAnimatedStyle]}>
            <Shadow>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: SIZES.width - (SIZES.padding * 2),
                    paddingHorizontal: SIZES.radius,
                    borderRadius: SIZES.radius,
                    backgroundColor: appTheme.backgroundColor1
                }}>
                    <Image source={icons.search} style={{ width: 25, height: 25, tintColor: COLORS.gray40 }}/>

                    <TextInput style={{ flex: 1, marginLeft: SIZES.base, ...FONTS.h4 }} value={''}
                               placeholder={'Search topics, courses & Educators'} placeholderTextColor={COLORS.gray10}/>
                </View>
            </Shadow>
        </Animated.View>
    )
}

type SearchProps = ReduxProps
const Search = ({ appTheme }: SearchProps) => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()

    const scrollViewRef = useRef<Animated.ScrollView>(null)

    const scrollY = useSharedValue(0)
    const onScroll = useAnimatedScrollHandler(e => scrollY.value = e.contentOffset.y)

    return (
        <View style={{ flex: 1, backgroundColor: appTheme.backgroundColor1 }}>
            <Animated.ScrollView ref={scrollViewRef} contentContainerStyle={{ marginTop: 100, paddingBottom: 300 }}
                                 showsVerticalScrollIndicator={false} scrollEventThrottle={16}
                                 keyboardDismissMode={'on-drag'} onScroll={onScroll} onScrollEndDrag={e => {
                if (e.nativeEvent.contentOffset.y > 10 && e.nativeEvent.contentOffset.y < 50) {
                    scrollViewRef.current?.scrollTo({ x: 0, y: 60, animated: true })
                }
            }}>
                {/*TopSearches*/}
                <View style={{ marginTop: SIZES.padding }}>
                    <Text style={{ marginHorizontal: SIZES.padding, color: appTheme.textColor, ...FONTS.h2 }}>Top
                        Searches</Text>

                    <FlatList horizontal data={dummyData.top_searches} listKey={'TopSearches'}
                              keyExtractor={item => `top-searches-${item.id}`} showsHorizontalScrollIndicator={false}
                              contentContainerStyle={{ marginTop: SIZES.radius }}
                              renderItem={({ item, index: i }) => (
                                  <TextButton label={item.label}
                                              contentContainerStyle={{
                                                  paddingVertical: SIZES.radius,
                                                  paddingHorizontal: SIZES.padding,
                                                  marginLeft: i === 0 ? SIZES.padding : SIZES.radius,
                                                  marginRight: i === dummyData.top_searches.length - 1 ? SIZES.padding : 0,
                                                  borderRadius: SIZES.radius,
                                                  backgroundColor: appTheme.backgroundColor8
                                              }} labelStyle={{ color: appTheme.textColor3, ...FONTS.h3 }}/>
                              )}/>
                </View>

                {/*BrowseCategories*/}
                <View style={{ marginTop: SIZES.padding }}>
                    <Text style={{ marginHorizontal: SIZES.padding, color: appTheme.textColor, ...FONTS.h2 }}>
                        Browse Categories
                    </Text>

                    <FlatList data={dummyData.categories} numColumns={2} scrollEnabled={false}
                              listKey={'BrowseCategories'}
                              keyExtractor={item => `browse-categories-${item.id}`}
                              contentContainerStyle={{ marginTop: SIZES.radius }}
                              renderItem={({ item, index: i }) => (
                                  <CategoryCard sharedElementPrefix={'Search'} category={item} containerStyle={{
                                      height: 130,
                                      width: (SIZES.width - (SIZES.padding * 2) - SIZES.radius) / 2,
                                      marginTop: SIZES.radius,
                                      marginLeft: (i + 1) % 2 === 0 ? SIZES.radius : SIZES.padding
                                  }} onPress={() => navigation.navigate('CourseListing', {
                                      category: item,
                                      sharedElementPrefix: 'Search'
                                  })}/>
                              )}/>
                </View>
            </Animated.ScrollView>

            <SearchBar scrollY={scrollY} appTheme={appTheme}/>
        </View>
    )
}

export default connector(Search);