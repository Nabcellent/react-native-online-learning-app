import { Image, ImageSourcePropType, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import { COLORS, FONTS, SIZES } from "../constants";
import icons from '../constants/icons';
import IconLabel from './IconLabel';

type VerticalCourseCardProps = {
    containerStyle: ViewStyle
    course: { id: number, title: string, duration: string, thumbnail: ImageSourcePropType }
}

export const VerticalCourseCard = ({ containerStyle, course }: VerticalCourseCardProps) => (
    <TouchableOpacity style={{ width: 270, ...containerStyle }}>
        <Image source={course.thumbnail} resizeMode={'cover'}
               style={{ width: '100%', height: 150, marginBottom: SIZES.radius, borderRadius: SIZES.radius }}/>

        <View style={{ flexDirection: 'row' }}>
            <View style={{
                width: 45,
                height: 45,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 25,
                backgroundColor: COLORS.primary3
            }}>
                <Image source={icons.play} resizeMode={'contain'} style={{ width: 20, height: 20 }}/>
            </View>

            <View style={{ flexShrink: 1, paddingHorizontal: SIZES.radius }}>
                <Text style={{ flex: 1, ...FONTS.h3, fontSize: 15 }}>{course.title}</Text>
                <IconLabel icon={icons.time} label={course.duration} containerStyle={{ marginTop: SIZES.base }}/>
            </View>
        </View>
    </TouchableOpacity>
);

export default VerticalCourseCard;