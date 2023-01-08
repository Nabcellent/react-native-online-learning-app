import { Image, ImageBackground, ImageSourcePropType, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import { COLORS, FONTS, icons, SIZES } from "../constants";
import React from "react";
import IconLabel from './IconLabel';
import { connector, ReduxProps } from "../stores";

type HorizontalCourseCardProps = ReduxProps & {
    course: {
        id: number
        title: string
        duration: string
        instructor: string
        ratings: number
        price: number
        is_favourite: boolean
        thumbnail: ImageSourcePropType
    },
    containerStyle: ViewStyle
}

const HorizontalCourseCard = ({ course, containerStyle, appTheme }: HorizontalCourseCardProps) => {
    return (
        <TouchableOpacity style={{ flexDirection: 'row', ...containerStyle }}>
            <ImageBackground source={course.thumbnail} resizeMode={'cover'}
                             style={{ width: 130, height: 130, marginBottom: SIZES.radius }}
                             imageStyle={{ borderRadius: SIZES.radius }}>
                <View style={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    width: 30,
                    height: 30,
                    alignItems: 'center',
                    justifyContent: 'center', borderRadius: 5, backgroundColor: appTheme.backgroundColor1
                }}>
                    <Image source={icons.favourite} resizeMode={'contain'} style={{
                        width: 20,
                        height: 20,
                        tintColor: course.is_favourite ? COLORS.secondary : COLORS.additionalColor4
                    }}/>
                </View>
            </ImageBackground>

            <View style={{ flex: 1, marginLeft: SIZES.base }}>
                <Text style={{ ...FONTS.h3, color: appTheme.textColor, fontSize: 15 }}>{course.title}</Text>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: SIZES.base }}>
                    <Text style={{ ...FONTS.body4, color: appTheme.textColor3 }}>By {course.instructor}</Text>
                    <IconLabel label={course.duration} icon={icons.time} containerStyle={{ marginLeft: SIZES.base }}
                               iconStyle={{ width: 15, height: 15 }} labelStyle={{ ...FONTS.body4 }}/>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: SIZES.base }}>
                    <Text style={{ ...FONTS.h3, color: COLORS.primary }}>KES {(course.price * 100).toFixed(2)}</Text>

                    <IconLabel icon={icons.star} label={course.ratings} containerStyle={{ marginLeft: SIZES.base }}
                               iconStyle={{ width: 15, height: 15, tintColor: COLORS.primary2 }}
                               labelStyle={{ marginLeft: 5, color: appTheme.textColor7, ...FONTS.h4 }}/>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default connector(HorizontalCourseCard);