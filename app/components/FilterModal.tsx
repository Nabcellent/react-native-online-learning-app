import React, { useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import Animated, { interpolate, SharedValue, useAnimatedStyle, withDelay, withTiming } from 'react-native-reanimated';
import { COLORS, FONTS, SIZES } from "../constants";
import TextButton from "./TextButton";
import constants from "../constants/constants";
import { ClassLevel, ClassType } from "../utils/types";
import icons from "../constants/icons";
import LineDivider from "./LineDivider";
import TwoPointSlider from "./TwoPointSlider";

type FilterModalProps = {
    shareValue1: SharedValue<number>
    shareValue2: SharedValue<number>
}
type ClassTypeOptionProps = {
    containerStyle: ViewStyle,
    classType: ClassType,
    isSelected: boolean,
    onPress: () => void,
}
type ClassLevelOptionProps = {
    containerStyle?: ViewStyle,
    classLevel: ClassLevel
    isLastItem: boolean
    isSelected: boolean
    onPress: () => void
}

const ClassTypeOption = ({ containerStyle, classType, isSelected, onPress }: ClassTypeOptionProps) => (
    <TouchableOpacity style={{
        flex: 1,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: SIZES.radius,
        borderRadius: SIZES.radius,
        backgroundColor: isSelected ? COLORS.primary3 : COLORS.additionalColor9,
        ...containerStyle
    }} onPress={onPress}>
        <Image source={classType.icon} resizeMode={'contain'}
               style={{ width: 40, height: 40, tintColor: isSelected ? COLORS.white : COLORS.gray80 }}/>
        <Text style={{
            marginTop: SIZES.base,
            color: isSelected ? COLORS.white : COLORS.gray80, ...FONTS.h3
        }}>{classType.label}</Text>
    </TouchableOpacity>
)

const ClassLevelOption = ({ containerStyle, classLevel, isSelected, onPress, isLastItem }: ClassLevelOptionProps) => (
    <>
        <TouchableOpacity style={{ flexDirection: 'row', height: 50, alignItems: 'center', ...containerStyle }}
                          onPress={onPress}>
            <Text style={{ flex: 1, ...FONTS.body3 }}>{classLevel.label}</Text>

            <Image source={isSelected ? icons.checkbox_on : icons.checkbox_off} resizeMode={'contain'}
                   style={{ width: 20, height: 20 }}/>
        </TouchableOpacity>
        {!isLastItem && <LineDivider lineStyle={{ height: 1 }}/>}
    </>
)

const FilterModal = ({ shareValue1, shareValue2 }: FilterModalProps) => {
    const [classType, setClassType] = useState<number>()
    const [classLevel, setClassLevel] = useState<number>()
    const [createdWithin, setCreatedWithin] = useState<number>()

    const containerAnimatedStyle = useAnimatedStyle(() => ({
        opacity: interpolate(shareValue1.value, [SIZES.height, 0], [0, 1]),
        transform: [{ translateY: shareValue1.value }]
    }))
    const bgAnimatedStyle = useAnimatedStyle(() => ({
        opacity: interpolate(shareValue2.value, [SIZES.height, 0], [0, 1]),
    }))
    const contentAnimatedStyle = useAnimatedStyle(() => ({
        opacity: interpolate(shareValue2.value, [SIZES.height, 0], [0, 1]),
        transform: [{ translateY: shareValue2.value }]
    }))

    return (
        <Animated.View style={[{
            position: 'absolute',
            bottom: 0,
            height: SIZES.height,
            width: SIZES.width
        }, containerAnimatedStyle]}>
            {/*Background Container*/}
            <Animated.View style={[{
                flex: 1,
                height: SIZES.height,
                width: SIZES.width,
                backgroundColor: COLORS.transparentBlack7
            }, bgAnimatedStyle]}>
                {/*Content Container*/}
                <Animated.View style={[{
                    position: 'absolute',
                    bottom: 0,
                    height: SIZES.height * .9,
                    width: SIZES.width,
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30,
                    backgroundColor: COLORS.white
                }, contentAnimatedStyle]}>
                    {/*Header*/}
                    <View style={{ marginTop: SIZES.padding, flexDirection: 'row', paddingHorizontal: SIZES.padding }}>
                        <View style={{ width: 60 }}/>
                        <Text style={{ flex: 1, textAlign: 'center', ...FONTS.h1 }}>Filter</Text>

                        <TextButton label={'Cancel'} contentContainerStyle={{ width: 60, backgroundColor: undefined }}
                                    labelStyle={{ color: COLORS.black, ...FONTS.body3 }}
                                    onPress={() => {
                                        shareValue2.value = withTiming(SIZES.height, { duration: 500 })
                                        shareValue1.value = withDelay(500, withTiming(SIZES.height, { duration: 100 }))
                                    }}/>
                    </View>

                    {/*Content*/}
                    <ScrollView contentContainerStyle={{ paddingHorizontal: SIZES.padding, paddingBottom: 50 }}>
                        {/*Class Type*/}
                        <View style={{ marginTop: SIZES.radius }}>
                            <Text style={{ ...FONTS.h3 }}>Class Type</Text>

                            <View style={{ flexDirection: 'row', marginTop: SIZES.radius }}>
                                {constants.class_types.map((ct, i) => (
                                    <ClassTypeOption key={`class-type-${i}`} classType={ct}
                                                     isSelected={classType === ct.id}
                                                     containerStyle={{ marginLeft: i === 0 ? 0 : SIZES.base }}
                                                     onPress={() => setClassType(ct.id)}/>
                                ))}
                            </View>
                        </View>

                        {/*Class Level*/}
                        <View style={{ marginTop: SIZES.padding }}>
                            <Text style={{ ...FONTS.h3 }}>Class Level</Text>

                            <View>
                                {constants.class_levels.map((cl, i) => (
                                    <ClassLevelOption key={`class-type-${i}`} classLevel={cl}
                                                      isLastItem={i === constants.class_levels.length - 1}
                                                      isSelected={classLevel === cl.id}
                                                      onPress={() => setClassLevel(cl.id)}/>
                                ))}
                            </View>
                        </View>

                        {/*Created Within*/}
                        <View style={{ marginTop: SIZES.radius }}>
                            <Text style={{ ...FONTS.h3 }}>Created Within</Text>

                            <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
                                {constants.created_within.map((cw, i) => (
                                    <TextButton key={`created-within-${i}`} label={cw.label}
                                                contentContainerStyle={{
                                                    height: 45,
                                                    paddingHorizontal: SIZES.radius,
                                                    marginLeft: i % 3 === 0 ? 0 : SIZES.radius,
                                                    marginTop: SIZES.radius,
                                                    borderWidth: 1,
                                                    borderRadius: SIZES.radius,
                                                    borderColor: COLORS.gray20,
                                                    backgroundColor: cw.id === createdWithin ? COLORS.primary3 : undefined
                                                }}
                                                labelStyle={{ color: cw.id === createdWithin ? COLORS.white : COLORS.black, ...FONTS.body3 }}
                                                onPress={() => setCreatedWithin(cw.id)}/>
                                ))}
                            </View>
                        </View>

                        {/*Class Length*/}
                        <View style={{ marginTop: SIZES.padding }}>
                            <Text style={{ ...FONTS.h3 }}>Class Length</Text>

                            <View style={{ alignItems: 'center' }}>
                                <TwoPointSlider values={[25, 50]} min={15} max={60} postfix={'min'}
                                                onValuesChange={values => console.log(values)}/>
                            </View>
                        </View>
                    </ScrollView>

                    {/*Footer*/}
                    <View style={{
                        flexDirection: 'row',
                        height: 50,
                        marginBottom: 30,
                        paddingHorizontal: SIZES.padding
                    }}>
                        <TextButton label={'Reset'} contentContainerStyle={{
                            flex: 1,
                            borderRadius: SIZES.radius,
                            borderWidth: 1,
                            backgroundColor: undefined
                        }} labelStyle={{ color: COLORS.black, ...FONTS.h3 }}/>
                        <TextButton contentContainerStyle={{
                            flex: 1,
                            marginLeft: SIZES.radius,
                            borderRadius: SIZES.radius,
                            borderWidth: 2,
                            borderColor: COLORS.primary,
                            backgroundColor: COLORS.primary
                        }} labelStyle={{ color: COLORS.white, ...FONTS.h3 }} label={'Apply'}/>
                    </View>
                </Animated.View>
            </Animated.View>
        </Animated.View>
    );
};

export default FilterModal;