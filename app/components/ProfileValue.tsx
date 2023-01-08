import { GestureResponderEvent, Image, ImageSourcePropType, Text, TouchableOpacity, View } from "react-native";
import { COLORS, FONTS, SIZES } from "../constants";
import React from "react";
import icons from "../constants/icons";
import { connector, ReduxProps } from "../stores";

type ProfileValueProps = ReduxProps & {
    icon: ImageSourcePropType
    label?: string
    value: string
    onPress?: (event: GestureResponderEvent) => void
}

const ProfileValue = ({ icon, label, value, onPress, appTheme }: ProfileValueProps) => (
    <TouchableOpacity style={{ flexDirection: 'row', height: 80, alignItems: 'center' }} onPress={onPress}>
        <View style={{
            width: 40,
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 20,
            backgroundColor: appTheme?.backgroundColor3
        }}>
            <Image source={icon} resizeMode={'contain'} style={{ width: 25, height: 25, tintColor: COLORS.primary }}/>
        </View>

        <View style={{ flex: 1, marginLeft: SIZES.radius }}>
            {label && <Text style={{ color: COLORS.gray30, ...FONTS.body3 }}>{label}</Text>}

            <Text style={{ color: appTheme?.textColor, ...FONTS.h3 }}>{value}</Text>
        </View>

        <Image source={icons.right_arrow} style={{ width: 15, height: 15, tintColor: appTheme?.tintColor }}/>
    </TouchableOpacity>
)

export default connector(ProfileValue)