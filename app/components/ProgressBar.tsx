import React from 'react';
import { StyleProp, View } from "react-native";
import { COLORS } from "../constants";

type ProgressBarProps = {
    containerStyle?: StyleProp<any>
    progress: string
}
const ProgressBar = ({ containerStyle, progress }: ProgressBarProps) => {
    return (
        <View style={{ width: '100%', height: 13, borderRadius: 10, backgroundColor: COLORS.white, ...containerStyle }}>
            <View style={{
                position: 'absolute',
                left: 0,
                height: '100%',
                width: progress,
                borderRadius: 10,
                backgroundColor: COLORS.primary
            }}/>
        </View>
    );
};

export default ProgressBar;