import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { MainLayout } from './app/screens';
import { NavigationContainer } from '@react-navigation/native';
import { useEffect } from 'react';
import { Provider } from "react-redux";
import { ReduxProps, store } from "./app/stores";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { Easing } from "react-native";
import CourseListing from "./app/screens/Course/CourseListing";
import { StackNavigationOptions } from "@react-navigation/stack";
import { Category, Course } from "./app/utils/types";
import CourseDetails from "./app/screens/Course/CourseDetails";

export type RootStackParamList = ReduxProps & {
    Dashboard: undefined;
    CourseListing: { category: Category, sharedElementPrefix: string };
    CourseDetails: { course: Course };
    Home: ReduxProps;
};

const Stack = createSharedElementStackNavigator<RootStackParamList>();
const options: StackNavigationOptions = {
    gestureEnabled: false,
    transitionSpec: {
        open: {
            animation: 'timing',
            config: { duration: 400, easing: Easing.inOut(Easing.ease) }
        },
        close: {
            animation: 'timing',
            config: { duration: 400, easing: Easing.inOut(Easing.ease) }
        }
    },
    cardStyleInterpolator: ({ current: { progress } }) => ({ cardStyle: { opacity: progress } })
}

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
    let [fontsLoaded] = useFonts({
        'Roboto-Black': require('./assets/fonts/Roboto-Black.ttf'),
        'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
        'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    });

    useEffect(() => {
        async function prepare() {
            if (fontsLoaded) await SplashScreen.hideAsync();
        }

        prepare();
    }, [fontsLoaded]);

    if (!fontsLoaded) return null;

    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}
                                 initialRouteName={'Dashboard'} detachInactiveScreens={false}>
                    <Stack.Screen name="Dashboard" component={MainLayout}/>
                    <Stack.Screen name="CourseListing" component={CourseListing} options={() => options}/>
                    <Stack.Screen name="CourseDetails" component={CourseDetails}/>
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}
