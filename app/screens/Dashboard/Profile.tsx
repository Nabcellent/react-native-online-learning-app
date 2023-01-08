import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, FONTS, SIZES } from "../../constants";
import IconButton from "../../components/IconButton";
import icons from "../../constants/icons";
import images from "../../constants/images";
import ProgressBar from "../../components/ProgressBar";
import TextButton from "../../components/TextButton";
import ProfileValue from "../../components/ProfileValue";
import LineDivider from "../../components/LineDivider";
import ProfileRadioButton from "../../components/ProfileRadioButton";

const Header = () => (
    <View style={{
        flexDirection: 'row',
        marginTop: 15,
        paddingHorizontal: SIZES.padding,
        justifyContent: 'space-between'
    }}>
        <Text style={{ ...FONTS.h1 }}>Profile</Text>
        <IconButton icon={icons.sun} iconStyle={{ tintColor: COLORS.black }}/>
    </View>
)

const ProfileCard = () => (
    <View style={{
        flexDirection: 'row',
        marginTop: SIZES.padding,
        paddingHorizontal: SIZES.radius,
        paddingVertical: 20,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.primary3
    }}>
        <TouchableOpacity style={{ width: 80, height: 80 }}>
            <Image source={images.profile} style={{
                width: '100%',
                height: '100%',
                borderWidth: 1,
                borderRadius: 40,
                borderColor: COLORS.white
            }}/>

            <View style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'flex-end'
            }}>
                <View style={{
                    width: 30,
                    height: 30,
                    marginBottom: -15,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 15,
                    backgroundColor: COLORS.primary
                }}>
                    <Image source={icons.camera} resizeMode={'contain'} style={{ width: 17, height: 17 }}/>
                </View>
            </View>
        </TouchableOpacity>

        <View style={{ flex: 1, marginLeft: SIZES.radius, alignItems: 'flex-start' }}>
            <Text style={{ color: COLORS.white, ...FONTS.h2 }}>Lil Berry</Text>
            <Text style={{ color: COLORS.white, ...FONTS.body4 }}>Pretty Young Lady</Text>

            <ProgressBar progress={'78%'} containerStyle={{ marginTop: SIZES.radius }}/>

            <View style={{ flexDirection: 'row' }}>
                <Text style={{ flex: 1, color: COLORS.white, ...FONTS.body4 }}>Overall progress</Text>
                <Text style={{ color: COLORS.white, ...FONTS.body4 }}>78%</Text>
            </View>

            <TextButton label={'+ Become Member'} contentContainerStyle={{
                height: 35,
                marginTop: SIZES.padding,
                paddingHorizontal: SIZES.radius,
                borderRadius: 20,
                backgroundColor: COLORS.white
            }} labelStyle={{ color: COLORS.primary }}/>
        </View>
    </View>
)

const Profile = () => {
    const [newCourseNotification, setNewCourseNotification] = useState(false)
    const [studyReminder, setStudyReminder] = useState(false)

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.white }}>
            <Header/>

            <ScrollView contentContainerStyle={{ paddingHorizontal: SIZES.padding, paddingBottom: 150 }}>
                <ProfileCard/>

                {/*Profile Section One*/}
                <View style={styles.profileSectionContainer}>
                    <ProfileValue icon={icons.profile} label={'Name'} value={'Lil Berry'}/>
                    <LineDivider/>
                    <ProfileValue icon={icons.email} label={'Email'} value={'tasha@gmail.com'}/>
                    <LineDivider/>
                    <ProfileValue icon={icons.password} label={'Password'} value={'Updated 2 weeks ago'}/>
                    <LineDivider/>
                    <ProfileValue icon={icons.call} label={'Phone number'} value={'+254 727 474 615'}/>
                </View>

                {/*Profile Section Two*/}
                <View style={styles.profileSectionContainer}>
                    <ProfileValue icon={icons.star_1} value={'Pages'}/>
                    <LineDivider/>
                    <ProfileRadioButton icon={icons.new_icon} label={'New Course Notifications'}
                                        checked={newCourseNotification}
                                        onPress={() => setNewCourseNotification(!newCourseNotification)}/>
                    <LineDivider/>
                    <ProfileRadioButton icon={icons.reminder} label={'Study Reminder'} checked={studyReminder}
                                        onPress={() => setStudyReminder(!studyReminder)}/>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    profileSectionContainer: {
        marginTop: SIZES.padding,
        paddingHorizontal: SIZES.padding,
        borderWidth: 1,
        borderRadius: SIZES.radius,
        borderColor: COLORS.gray20
    }
})

export default Profile;