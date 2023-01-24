import React from 'react';
import { GestureResponderEvent, Image, ImageBackground, ScrollView, Text, View, ViewStyle } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../constants';
import IconButton from '../../components/IconButton';
import icons from '../../constants/icons';
import images from '../../constants/images';
import TextButton from '../../components/TextButton';
import dummyData from '../../constants/dummyData';
import VerticalCourseCard from '../../components/VerticalCourseCard';
import { FlatList } from 'react-native-gesture-handler';
import LineDivider from '../../components/LineDivider';
import CategoryCard from '../../components/CategoryCard';
import HorizontalCourseCard from '../../components/HorizontalCourseCard';
import { connector, ReduxProps } from "../../stores";
import { SelectedThemeType } from "../../constants/theme";
import { RootStackParamList } from "../../../App";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

type SectionProps = {
    containerStyle?: ViewStyle,
    appTheme: SelectedThemeType
    title: string
    onPress?: (event: GestureResponderEvent) => void
    children: any
}

const Section = ({ containerStyle, title, onPress, children, appTheme }: SectionProps) => (
    <View style={{ ...containerStyle }}>
        <View style={{ flexDirection: 'row', paddingHorizontal: SIZES.padding }}>
            <Text style={{ flex: 1, color: appTheme.textColor, ...FONTS.h2 }}>{title}</Text>
            <TextButton contentContainerStyle={{ width: 80, borderRadius: 30, backgroundColor: COLORS.primary }}
                        label={'See All'} onPress={onPress}/>
        </View>

        {children}
    </View>
);

const Home = ({ appTheme }: ReduxProps) => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()

    return (
        <View style={{ flex: 1, backgroundColor: appTheme?.backgroundColor1 }}>
            {/*Header*/}
            <View style={{
                flexDirection: 'row',
                marginTop: 40,
                marginBottom: 10,
                paddingHorizontal: SIZES.padding,
                alignItems: 'center'
            }}>
                <View style={{ flex: 1 }}>
                    <Text style={{ color: appTheme?.textColor, ...FONTS.h2 }}>Hello, Lil Berry!</Text>
                    <Text style={{ color: COLORS.gray50, ...FONTS.body3 }}>Saturday, 27th Aug 2022</Text>
                </View>

                <IconButton icon={icons.notification} iconStyle={{ tintColor: appTheme?.tintColor }}/>
            </View>

            <ScrollView contentContainerStyle={{ paddingBottom: 150 }} showsVerticalScrollIndicator={false}>
                {/*StartLearning*/}
                <ImageBackground source={images.featured_bg_image} style={{
                    alignItems: 'flex-start',
                    marginTop: SIZES.padding,
                    marginHorizontal: SIZES.padding,
                    padding: 15
                }} imageStyle={{ borderRadius: SIZES.radius }}>
                    <View>
                        <Text style={{ color: COLORS.white, ...FONTS.body2 }}>HOW TO</Text>
                        <Text style={{ color: COLORS.white, ...FONTS.h2 }}>
                            Love Natasha Wangui Gichuhi exceptionally well.
                        </Text>
                        <Text style={{ marginTop: SIZES.radius, color: COLORS.white, ...FONTS.body4 }}>By Lil
                            Nabz</Text>
                    </View>

                    <Image source={images.start_learning}
                           style={{ width: '100%', height: 110, marginTop: SIZES.padding }}/>
                    <TextButton label={'Start Learning'}
                                contentContainerStyle={{
                                    height: 40,
                                    paddingHorizontal: SIZES.padding,
                                    borderRadius: 20,
                                    backgroundColor: COLORS.white
                                }} labelStyle={{ color: COLORS.black }}/>

                </ImageBackground>

                {/*Courses*/}
                <FlatList horizontal data={dummyData.courses_list_1} listKey={'Courses'}
                          keyExtractor={course => `course-${course.id}`}
                          showsHorizontalScrollIndicator={false} contentContainerStyle={{ marginTop: SIZES.padding }}
                          renderItem={({ item, index }) => (
                              <VerticalCourseCard containerStyle={{
                                  marginLeft: index == 0 ? SIZES.padding : SIZES.radius,
                                  marginRight: index == dummyData.courses_list_1.length - 1 ? SIZES.padding : 0
                              }} course={item}/>
                          )}/>

                <LineDivider lineStyle={{ marginVertical: SIZES.padding }}/>

                {/*Categories*/}
                <Section title={'Categories'} appTheme={appTheme}>
                    <FlatList horizontal data={dummyData.categories} listKey={'Categories'}
                              keyExtractor={cat => `cat-${cat.id}`}
                              showsHorizontalScrollIndicator={false} contentContainerStyle={{ marginTop: SIZES.radius }}
                              renderItem={({ item, index }) => (
                                  <CategoryCard sharedElementPrefix={'Home'} category={item}
                                                containerStyle={{
                                                    marginLeft: index === 0 ? SIZES.padding : SIZES.base,
                                                    marginRight: index === dummyData.categories.length - 1 ? SIZES.padding : 0
                                                }}
                                                onPress={() => navigation.navigate('CourseListing', {
                                                    category: item,
                                                    sharedElementPrefix: 'Home'
                                                })}/>
                              )}/>
                </Section>

                {/*PopularCourses*/}
                <Section title={'Popular Courses'} containerStyle={{ marginTop: 30 }} appTheme={appTheme}>
                    <FlatList data={dummyData.courses_list_2} listKey={'PopularCourses'} scrollEnabled={false}
                              keyExtractor={course => `course-${course.id}`}
                              contentContainerStyle={{ marginTop: SIZES.radius, paddingHorizontal: SIZES.padding }}
                              renderItem={({ item, index }) => <HorizontalCourseCard course={item} containerStyle={{
                                  marginVertical: SIZES.padding,
                                  marginTop: index === 0 ? SIZES.radius : SIZES.padding
                              }} onPress={() => navigation.navigate('CourseDetails', { course: item })}/>}
                              ItemSeparatorComponent={() => <LineDivider
                                  lineStyle={{ backgroundColor: COLORS.gray20 }}/>}/>
                </Section>
            </ScrollView>
        </View>
    );
};

export default connector(Home);