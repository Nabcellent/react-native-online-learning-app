import React, { useRef } from 'react';
import { Image, Text, TextInput, View } from 'react-native';
import { COLORS, FONTS, SIZES } from "../../constants";
import dummyData from "../../constants/dummyData";
import TextButton from "../../components/TextButton";
import { FlatList } from 'react-native-gesture-handler';
import CategoryCard from "../../components/CategoryCard";
import Animated, {
    Extrapolation,
    interpolate,
    SharedValue,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue
} from 'react-native-reanimated'
import { Shadow } from "react-native-shadow-2";
import icons from "../../constants/icons";

const TopSearches = () => (
    <View style={{ marginTop: SIZES.padding }}>
        <Text style={{ marginHorizontal: SIZES.padding, ...FONTS.h2 }}>Top Searches</Text>

        <FlatList horizontal data={dummyData.top_searches} listKey={'TopSearches'}
                  keyExtractor={item => `top-searches-${item.id}`} showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ marginTop: SIZES.radius }}
                  renderItem={({ item, index: i }) => (
                      <TextButton label={item.label}
                                  contentContainerStyle={{
                                      paddingVertical: SIZES.radius,
                                      paddingHorizontal: SIZES.padding,
                                      marginLeft: i === 0 ? SIZES.padding : SIZES.radius,
                                      marginRight: i === dummyData.top_searches.length - 1 ? SIZES.padding : 0,
                                      borderRadius: SIZES.radius,
                                      backgroundColor: COLORS.gray10
                                  }} labelStyle={{ color: COLORS.gray50, ...FONTS.h3 }}/>
                  )}/>
    </View>
)

const BrowseCategories = () => (
    <View style={{ marginTop: SIZES.padding }}>
        <Text style={{ marginHorizontal: SIZES.padding, ...FONTS.h2 }}>Browse Categories</Text>

        <FlatList data={dummyData.categories} numColumns={2} scrollEnabled={false} listKey={'BrowseCategories'}
                  keyExtractor={item => `browse-categories-${item.id}`}
                  contentContainerStyle={{ marginTop: SIZES.radius }}
                  renderItem={({ item, index: i }) => (
                      <CategoryCard category={item} containerStyle={{
                          height: 130,
                          width: (SIZES.width - (SIZES.padding * 2) - SIZES.radius) / 2,
                          marginTop: SIZES.radius,
                          marginLeft: (i + 1) % 2 === 0 ? SIZES.radius : SIZES.padding
                      }}/>
                  )}/>
    </View>
)

const SearchBar = ({ scrollY }: { scrollY: SharedValue<number> }) => {
    const inputRange = [0, 55]
    const searchBarAnimatedStyle = useAnimatedStyle(() => ({
        height: interpolate(scrollY.value, inputRange, [55, 0], Extrapolation.CLAMP),
        opacity: interpolate(scrollY.value, inputRange, [1, 0], Extrapolation.CLAMP)
    }))

    return (
        <Animated.View
            style={[{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 50,
                height: 50,
                paddingHorizontal: SIZES.padding
            }, searchBarAnimatedStyle]}>
            <Shadow>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: SIZES.width - (SIZES.padding * 2),
                    paddingHorizontal: SIZES.radius,
                    borderRadius: SIZES.radius,
                    backgroundColor: COLORS.white
                }}>
                    <Image source={icons.search} style={{ width: 25, height: 25, tintColor: COLORS.gray40 }}/>

                    <TextInput style={{ flex: 1, marginLeft: SIZES.base, ...FONTS.h4 }} value={''}
                               placeholder={'Search topics, courses & Educators'} placeholderTextColor={COLORS.gray10}/>
                </View>
            </Shadow>
        </Animated.View>
    )
}
const Search = () => {
    const scrollViewRef = useRef<Animated.ScrollView>(null)

    const scrollY = useSharedValue(0)
    const onScroll = useAnimatedScrollHandler(e => scrollY.value = e.contentOffset.y)

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.white }}>
            <Animated.ScrollView ref={scrollViewRef} contentContainerStyle={{ marginTop: 100, paddingBottom: 300 }}
                                 showsVerticalScrollIndicator={false} scrollEventThrottle={16}
                                 keyboardDismissMode={'on-drag'} onScroll={onScroll} onScrollEndDrag={e => {
                if (e.nativeEvent.contentOffset.y > 10 && e.nativeEvent.contentOffset.y < 50) {
                    scrollViewRef.current?.scrollTo({ x: 0, y: 60, animated: true })
                }
            }}>
                <TopSearches/>

                <BrowseCategories/>
            </Animated.ScrollView>

            <SearchBar scrollY={scrollY}/>
        </View>
    )
}

export default Search;