import React, { createRef, useEffect, useRef, useState } from 'react';
import { Animated, Image, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../constants';
import constants from '../../constants/constants';
import Home from './Home';
import Search from './Search';
import Profile from './Profile';
import { Shadow } from 'react-native-shadow-2';

type MeasureLayout = { x: number, y: number, width: number, height: number }

const bottomTabs = constants.bottom_tabs.map(tab => ({ ...tab, ref: createRef<TouchableOpacity>() }));

const TabIndicator = ({ measureLayout, scrollX }: { measureLayout: MeasureLayout[], scrollX: Animated.Value }) => {
    const inputRange = bottomTabs.map((_, i) => i * SIZES.width),
        tabIndicatorWidth = scrollX.interpolate({ inputRange, outputRange: measureLayout.map(m => m.width) }),
        translateX = scrollX.interpolate({ inputRange, outputRange: measureLayout.map(m => m.x) });

    return (
        <Animated.View style={{
            position: 'absolute',
            left: 0,
            height: '100%',
            width: tabIndicatorWidth,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.primary,
            transform: [{ translateX }]
        }}/>
    );
};

const Tabs = ({ scrollX }: { scrollX: Animated.Value }) => {
    const containerRef = useRef();
    const [measureLayout, setMeasureLayout] = useState<MeasureLayout[]>([]);

    useEffect(() => {
        let ml: MeasureLayout[] = [];

        bottomTabs.forEach(t => {
            t?.ref?.current?.measureLayout(containerRef.current!, (x, y, width, height) => {
                ml.push({ x, y, width, height });

                if (ml.length == bottomTabs.length) setMeasureLayout(ml);
            }, () => console.log('Failed to measure layout'));
        });
    }, [containerRef.current]);

    return (
        <View ref={containerRef} style={{ flex: 1, flexDirection: 'row' }}>
            {measureLayout.length > 0 && (
                <TabIndicator measureLayout={measureLayout} scrollX={scrollX}/>
            )}
            {bottomTabs.map((item, i) => (
                <TouchableOpacity key={`tab-${i}`} ref={item.ref} style={{
                    flex: 1,
                    paddingHorizontal: 15,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Image source={item.icon} resizeMode={'contain'} style={{ width: 25, height: 25 }}/>
                    <Text style={{ marginTop: 3, color: COLORS.white, ...FONTS.h3 }}>{item.label}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const MainLayout = () => {
    const flatListRef = useRef();
    const scrollX = useRef(new Animated.Value(0)).current;

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.white }}>
            <View style={{ flex: 1 }}>
                <Animated.FlatList ref={flatListRef} horizontal pagingEnabled snapToAlignment={'center'}
                                   snapToInterval={SIZES.width} decelerationRate={'fast'}
                                   showsHorizontalScrollIndicator={false} data={constants.bottom_tabs}
                                   keyExtractor={item => `main-${item.id}`}
                                   onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false })}
                                   renderItem={({ item }) => (
                                       <View style={{ height: SIZES.height, width: SIZES.width }}>
                                           {item.label == constants.screens.home && <Home/>}
                                           {item.label == constants.screens.search && <Search/>}
                                           {item.label == constants.screens.profile && <Profile/>}
                                       </View>
                                   )}/>
            </View>

            <View style={{ marginBottom: 20, paddingHorizontal: SIZES.padding, paddingVertical: SIZES.radius }}>
                <Shadow style={{ width: SIZES.width - (SIZES.padding * 2), height: 85 }}>
                    <View style={{ flex: 1, borderRadius: SIZES.radius, backgroundColor: COLORS.primary3 }}>
                        <Tabs scrollX={scrollX}/>
                    </View>
                </Shadow>
            </View>
        </View>
    );
};

export default MainLayout;