import { GestureResponderEvent, Image, ImageSourcePropType, StyleProp, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants';

type IconButtonProps = {
    containerStyle?: StyleProp<any>
    icon:  ImageSourcePropType
    iconStyle: StyleProp<any>
    onPress?: (event: GestureResponderEvent) => void
}

const IconButton = ({ containerStyle, icon, iconStyle, onPress }: IconButtonProps) => (
    <TouchableOpacity style={{ ...containerStyle }} onPress={onPress}>
        <Image source={icon} style={{ width: 30, height: 30, tintColor: COLORS.white, ...iconStyle }}/>
    </TouchableOpacity>
)

export default IconButton;
