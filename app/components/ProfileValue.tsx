import { GestureResponderEvent, Image, ImageSourcePropType, Text, TouchableOpacity, View } from "react-native";
import { COLORS, FONTS, SIZES } from "../constants";
import React from "react";
import icons from "../constants/icons";

type ProfileValueProps = {
    icon: ImageSourcePropType
    label: string
    value: string
    onPress?: (event: GestureResponderEvent) => void
}
const ProfileValue = ({ icon, label, value, onPress }: ProfileValueProps) => (
    <TouchableOpacity style={{ flexDirection: 'row', height: 80, alignItems: 'center' }}>
        <View style={{
            width: 40,
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 20,
            backgroundColor: COLORS.additionalColor11
        }}>
            <Image source={icon} resizeMode={'contain'} style={{ width: 25, height: 25, tintColor: COLORS.primary }}/>
        </View>

        <View style={{ flex: 1, marginLeft: SIZES.radius }}>
            {label && <Text style={{ color: COLORS.gray30, ...FONTS.body3 }}>{label}</Text>}

            <Text style={{ ...FONTS.h3 }}>{value}</Text>
        </View>

        <Image source={icons.right_arrow} style={{ width: 15, height: 15 }}/>
    </TouchableOpacity>
)

export default ProfileValue