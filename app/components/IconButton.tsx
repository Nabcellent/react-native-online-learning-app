import {
    GestureResponderEvent,
    Image,
    ImageSourcePropType,
    ImageStyle,
    TouchableOpacity,
    ViewStyle
} from 'react-native';
import { COLORS } from '../constants';

type IconButtonProps = {
    containerStyle?: ViewStyle
    icon:  ImageSourcePropType
    iconStyle: ImageStyle
    onPress?: (event: GestureResponderEvent) => void
}

const IconButton = ({ containerStyle, icon, iconStyle, onPress }: IconButtonProps) => (
    <TouchableOpacity style={{ ...containerStyle }} onPress={onPress}>
        <Image source={icon} resizeMode={'contain'} style={{ width: 30, height: 30, tintColor: COLORS.white, ...iconStyle }}/>
    </TouchableOpacity>
)

export default IconButton;
