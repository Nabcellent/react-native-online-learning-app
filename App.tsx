import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { MainLayout } from './app/screens';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import { Provider } from "react-redux";
import { store } from "./app/stores";

const Stack = createNativeStackNavigator();

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
                <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={'Dashboard'}>
                    <Stack.Screen name="Dashboard" component={MainLayout}/>
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}
