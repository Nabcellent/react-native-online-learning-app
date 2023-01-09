import React from 'react';
import { Image, StyleSheet, Text, View } from "react-native";
import Animated from 'react-native-reanimated';
import { connector, ReduxProps } from "../../stores";
import { SharedElement, SharedElementCompatRoute } from "react-navigation-shared-element";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../../App";
import { COLORS, FONTS } from "../../constants";
import IconButton from "../../components/IconButton";
import icons from "../../constants/icons";

type CourseListingProps = ReduxProps & StackScreenProps<RootStackParamList, 'CourseListing'>
const CourseListing = ({ appTheme, navigation, route }: CourseListingProps) => {
    const { category, sharedElementPrefix } = route.params

    return (
        <View style={{ flex: 1, backgroundColor: appTheme.backgroundColor1 }}>
            {/*Header*/}
            <Animated.View style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 250, overflow: 'hidden' }}>
                <SharedElement id={`${sharedElementPrefix}-category-card-bg-${category?.id}`}
                               style={[StyleSheet.absoluteFillObject]}>
                    <Image source={category?.thumbnail} resizeMode={'cover'}
                           style={{ height: '100%', width: '100%', borderBottomLeftRadius: 60 }}/>
                </SharedElement>

                <Animated.View style={{ position: 'absolute', bottom: 70, left: 30 }}>
                    <SharedElement id={`${sharedElementPrefix}-category-card-title-${category.id}`}
                                   style={[StyleSheet.absoluteFillObject]}>
                        <Text style={{ position: 'absolute', color: COLORS.white, ...FONTS.h1 }}>{category.title}</Text>
                    </SharedElement>
                </Animated.View>

                <Animated.View>
                    <IconButton icon={icons.back} iconStyle={{ tintColor: COLORS.black }}
                                containerStyle={{
                                    position: 'absolute',
                                    top: 40,
                                    left: 20,
                                    width: 50,
                                    height: 50,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 25,
                                    backgroundColor: COLORS.white
                                }} onPress={() => navigation.goBack()}/>
                </Animated.View>
            </Animated.View>
        </View>
    );
};

CourseListing.sharedElements = (route: SharedElementCompatRoute) => {
    const { category, sharedElementPrefix } = route.params

    return [
        { id: `${sharedElementPrefix}-category-card-bg-${category.id}` },
        { id: `${sharedElementPrefix}-category-card-title-${category.id}` }
    ]
}

export default connector(CourseListing);