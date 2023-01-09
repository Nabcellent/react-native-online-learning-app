import { GestureResponderEvent, Image, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { COLORS, FONTS, SIZES } from '../constants';
import { Category } from "../utils/types";
import { SharedElement } from "react-navigation-shared-element";

type CategoryCardProps = {
    category: Category,
    containerStyle: ViewStyle
    onPress?: (event: GestureResponderEvent) => void
    sharedElementPrefix: string
}

const CategoryCard = ({ category, containerStyle, onPress, sharedElementPrefix }: CategoryCardProps) => {
    return (
        <TouchableOpacity onPress={onPress} style={{ height: 150, width: 200, ...containerStyle }}>
            {/*Image Background*/}
            <SharedElement id={`${sharedElementPrefix}-category-card-bg-${category?.id}`}
                           style={[StyleSheet.absoluteFillObject]}>
                <Image source={category?.thumbnail} resizeMode={'cover'}
                       style={{ width: '100%', height: '100%', borderRadius: SIZES.radius }}/>
            </SharedElement>

            {/*Title*/}
            <View style={{ position: 'absolute', bottom: 50, left: SIZES.radius }}>
                <SharedElement id={`${sharedElementPrefix}-category-card-title-${category?.id}`}
                               style={[StyleSheet.absoluteFillObject]}>
                    <Text style={{ position: 'absolute', color: COLORS.white, ...FONTS.h2 }}>{category?.title}</Text>
                </SharedElement>
            </View>

            {/*<ImageBackground source={category.thumbnail} resizeMode={'cover'}
                             style={{
                                 height: 150,
                                 width: 200,
                                 paddingVertical: SIZES.padding,
                                 paddingHorizontal: SIZES.radius,
                                 justifyContent: 'flex-end',
                                 ...containerStyle
                             }} imageStyle={{ borderRadius: SIZES.radius }}>
                <Text style={{ color: COLORS.white, ...FONTS.h2 }}>{category.title}</Text>
            </ImageBackground>*/}
        </TouchableOpacity>
    );
};

export default CategoryCard;
