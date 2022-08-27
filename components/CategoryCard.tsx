import { ImageBackground, ImageSourcePropType, Text, TouchableOpacity, ViewStyle } from 'react-native';
import { COLORS, FONTS, SIZES } from '../constants';

type CategoryCardProps = {
    category: { id: number, title: string, thumbnail: ImageSourcePropType },
    containerStyle: ViewStyle
}

const CategoryCard = ({ category, containerStyle }: CategoryCardProps) => {
    return (
        <TouchableOpacity>
            <ImageBackground source={category.thumbnail} resizeMode={'cover'}
                             style={{
                                 height: 150,
                                 width: 200,
                                 paddingVertical: SIZES.padding,
                                 paddingHorizontal: SIZES.radius,
                                 justifyContent: 'flex-end',
                                 ...containerStyle
                             }}>
                <Text style={{ color: COLORS.white, ...FONTS.h2 }}>{category.title}</Text>
            </ImageBackground>
        </TouchableOpacity>
    );
};

export default CategoryCard;
