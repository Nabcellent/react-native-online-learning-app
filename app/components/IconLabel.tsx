import { Image, ImageSourcePropType, ImageStyle, Text, TextStyle, View, ViewStyle } from 'react-native';
import { COLORS, FONTS, SIZES } from "../constants";

type IconLabelProps = {
    iconStyle?: ImageStyle,
    containerStyle: ViewStyle,
    labelStyle?: TextStyle,
    label?: string | number,
    icon: ImageSourcePropType,
}

const IconLabel = ({ iconStyle, icon, containerStyle, label, labelStyle }: IconLabelProps) => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', ...containerStyle }}>
            <Image source={icon} style={{ width: 20, height: 20, tintColor: COLORS.gray30, ...iconStyle }}/>
            <Text style={{ marginLeft: SIZES.base, color: COLORS.gray30, ...FONTS.body3, ...labelStyle }}>{label}</Text>
        </View>
    );
};

export default IconLabel;