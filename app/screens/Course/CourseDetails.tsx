import React, { useState } from 'react';
import { ImageBackground, View } from "react-native";
import { connector, ReduxProps } from "../../stores";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../../App";
import { COLORS, SIZES } from "../../constants";
import IconButton from "../../components/IconButton";
import icons from "../../constants/icons";
import Video from 'react-native-video'
import dummyData from "../../constants/dummyData";

type CourseDetailsProps = ReduxProps & StackScreenProps<RootStackParamList, 'CourseDetails'>

const CourseDetails = ({ navigation, route, appTheme }: CourseDetailsProps) => {
    const { course } = route.params
    const [playVideo, setPlayVideo] = useState<boolean>(false)

    return (
        <View style={{ flex: 1, backgroundColor: appTheme.backgroundColor1 }}>
            {/*Header Bar*/}
            <View style={{
                position: 'absolute',
                top: SIZES.height > 100 ? 40 : 20,
                left: 0,
                right: 0,
                flexDirection: 'row',
                paddingHorizontal: SIZES.padding,
                zIndex: 1
            }}>
                <>
                    {/*Back*/}
                    <View style={{ flex: 1 }}>
                        <IconButton icon={icons.back} iconStyle={{ width: 25, height: 25, tintColor: COLORS.black }}
                                    containerStyle={{
                                        width: 40,
                                        height: 40,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: 20,
                                        backgroundColor: COLORS.white
                                    }} onPress={() => navigation.goBack()}/>
                    </View>

                    {/*Share & Favourite*/}
                    <View style={{ flexDirection: 'row' }}>
                        <IconButton icon={icons.media} iconStyle={{ tintColor: COLORS.white }} containerStyle={{
                            width: 50,
                            height: 50,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}/>
                        <IconButton icon={icons.favourite_outline} iconStyle={{ tintColor: COLORS.white }}
                                    containerStyle={{
                                        width: 50,
                                        height: 50,
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}/>
                    </View>
                </>
            </View>

            {/*Video*/}
            <View style={{
                height: SIZES.height > 800 ? 220 : 200,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: COLORS.gray90
            }}>
                {/*Thumbnail*/}
                <ImageBackground source={course.thumbnail} style={{
                    width: '100%',
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    {/*Play Button*/}
                    <IconButton icon={icons.play} iconStyle={{ width: 25, height: 25, tintColor: COLORS.white }}
                                containerStyle={{
                                    width: 55,
                                    height: 55,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginTop: SIZES.padding,
                                    borderRadius: 30,
                                    backgroundColor: COLORS.primary
                                }} onPress={() => setPlayVideo(true)}/>
                </ImageBackground>

                {playVideo && (
                    <Video source={{ uri: dummyData?.sample_video_url }}
                           style={{
                               position: 'absolute',
                               top: 0,
                               right: 0,
                               bottom: 0,
                               left: 0,
                               backgroundColor: COLORS.black
                           }}/>
                )}
            </View>
        </View>
    );
};

export default connector(CourseDetails);