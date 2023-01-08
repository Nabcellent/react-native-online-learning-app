import React, { useEffect, useRef } from 'react';
import {
    Animated,
    GestureResponderEvent,
    Image,
    ImageSourcePropType,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { COLORS, FONTS, SIZES } from "../constants";
import { RootState } from "../stores";
import { connect, ConnectedProps } from "react-redux";

const mapStateToProps = (state: RootState) => ({ appTheme: state.appTheme, })

const connector = connect(mapStateToProps)

type ReduxProps = Partial<ConnectedProps<typeof connector>>

type ProfileRadioButtonProps = ReduxProps & {
    icon: ImageSourcePropType
    label?: string
    checked: boolean
    onPress?: (event: GestureResponderEvent) => void
}

const ProfileRadioButton = ({ icon, label, checked, onPress, appTheme }: ProfileRadioButtonProps) => {
    const radioAnimated = useRef(new Animated.Value(0)).current
    const circleColorAnimated = radioAnimated.interpolate({
        inputRange: [0, 17],
        outputRange: [COLORS.gray40, COLORS.primary]
    })
    const lineColorAnimated = radioAnimated.interpolate({
        inputRange: [0, 17],
        outputRange: [COLORS.additionalColor4, COLORS.additionalColor13]
    })

    useEffect(() => {
        if (checked) {
            Animated.timing(radioAnimated, {
                toValue: 17,
                duration: 300,
                useNativeDriver: false
            }).start()
        } else {
            Animated.timing(radioAnimated, {
                toValue: 0,
                duration: 300,
                useNativeDriver: false
            }).start()
        }
    }, [checked])

    return (
        <View style={{ flexDirection: 'row', height: 80, alignItems: 'center' }}>
            <View style={{
                width: 40,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 20,
                backgroundColor: appTheme?.backgroundColor3
            }}>
                <Image source={icon} resizeMode={'contain'}
                       style={{ width: 25, height: 25, tintColor: COLORS.primary }}/>
            </View>

            <View style={{ flex: 1, marginLeft: SIZES.radius }}>
                <Text style={{ color: appTheme?.textColor, ...FONTS.h3 }}>{label}</Text>
            </View>

            <TouchableOpacity style={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center' }}
                              onPress={onPress}>
                <Animated.View
                    style={{ width: '100%', height: 5, borderRadius: 3, backgroundColor: lineColorAnimated }}/>
                <Animated.View style={{
                    position: 'absolute',
                    left: radioAnimated,
                    width: 25,
                    height: 25,
                    borderRadius: 50,
                    borderWidth: 5,
                    borderColor: circleColorAnimated,
                    backgroundColor: appTheme?.backgroundColor1
                }}/>
            </TouchableOpacity>
        </View>
    );
};

export default connector(ProfileRadioButton);