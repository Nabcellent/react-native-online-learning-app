import React from 'react';
import { GestureResponderEvent, Text, TextStyle, TouchableOpacity, ViewStyle } from "react-native";
import { COLORS, FONTS } from "../constants";

type TextButtonProps = {
    label: string
    labelStyle?: TextStyle
    contentContainerStyle: ViewStyle
    disabled?: boolean
    onPress?: (event: GestureResponderEvent) => void
}

const TextButton = ({ label, labelStyle, disabled, contentContainerStyle, onPress }: TextButtonProps) => (
    <TouchableOpacity style={{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.primary, ...contentContainerStyle
    }} disabled={disabled} onPress={onPress}>
        <Text style={{ color: COLORS.white, ...FONTS.h3, ...labelStyle }}>{label}</Text>
    </TouchableOpacity>
);

export default TextButton;