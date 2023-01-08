import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { MainLayout } from './app/screens';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect } from 'react';

const Stack = createNativeStackNavigator();

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
    let [fontsLoaded] = useFonts({
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
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={'Dashboard'}>
                <Stack.Screen name="Dashboard" component={MainLayout}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
