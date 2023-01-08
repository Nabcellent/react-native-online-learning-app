import React from 'react';
import { View, ViewStyle } from "react-native";
import { COLORS } from "../constants";

type LineDividerProps = {
    lineStyle: ViewStyle
}

const LineDivider = ({ lineStyle }: LineDividerProps) => {
    return (
        <View style={{ height: 2, width: "100%", backgroundColor: COLORS.gray20, ...lineStyle }}/>
    );
};

export default LineDivider;