import React from 'react';

import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';

import Header from './src/newcomps/Header';
import Footer from './src/newcomps/Footer';

import {
    DebugScreen,
    ChallengeScreen,
    CreateStoryScreen,
    FriendsScreen,
} from './src/screens/initialscreens';
import GenericAlbumDebug from './src/screens/GenericAlbumTest';
import GenericAlbum from './src/screens/GenericAlbum';
import Albums from './src/screens/Albums.js'
import FileViewer from './src/screens/FileViewer';
import OnlineHomepage from './src/screens/OnlineHomepage';
import OfflineHomepage from './src/screens/OfflineHomepage';
import LoginScreen from './src/screens/login';
import CreateOnline1 from './src/screens/CreateAccount1';
import CreateAccount2 from './src/screens/CreateAccount2';

const Stack = createNativeStackNavigator();

export default function App() {
    const [fontsLoaded] = useFonts({
        Italianno: require('./assets/fonts/Italianno-Regular.ttf'),
        'CrimsonText-Regular': require('./assets/fonts/CrimsonText-Regular.ttf'),
        'CrimsonText-SemiBold': require('./assets/fonts/CrimsonText-SemiBold.ttf'),
        'CrimsonText-Bold': require('./assets/fonts/CrimsonText-Bold.ttf'),
        'CrimsonText-Italic': require('./assets/fonts/CrimsonText-Italic.ttf'),
        'CrimsonText-BoldItalic': require('./assets/fonts/CrimsonText-BoldItalic.ttf'),
    });

    if (!fontsLoaded) {
        return (
            <View style={styles.loading}>
                <ActivityIndicator size="large" color="#BB77FF" />
            </View>
        );
    }

    const navigationRef = useNavigationContainerRef();
    const [currentRoute, setCurrentRoute] = React.useState(null);

    const hideFooterRoutes = ['CreateAccount1', 'CreateAccount2', 'Login'];
    const shouldShowFooter = !hideFooterRoutes.includes(currentRoute);

    return (
        <NavigationContainer
            ref={navigationRef}
            onReady={() => {
                setCurrentRoute(navigationRef.getCurrentRoute()?.name);
            }}
            onStateChange={() => {
                setCurrentRoute(navigationRef.getCurrentRoute()?.name);
            }}
        >
            <View style={styles.container}>
                <Header />
                <View style={[styles.content, !shouldShowFooter && { marginBottom: 0 }]}>
                    <Stack.Navigator
                        initialRouteName="Login"
                        screenOptions={{ headerShown: false }}
                    >
                        <Stack.Screen name="OnlineHomepage" component={OnlineHomepage} />
                        <Stack.Screen name="OfflineHomepage" component={OfflineHomepage} />
                        <Stack.Screen name="FreeWrite" component={OnlineHomepage} />
                        <Stack.Screen name="Challenge" component={ChallengeScreen} />
                        <Stack.Screen name="CollaborativeLanding" component={OnlineHomepage} />
                        <Stack.Screen name="CreateStory" component={CreateStoryScreen} />
                        <Stack.Screen name="Albums" component={Albums} />
                        <Stack.Screen name="FileViewer" component={FileViewer} />
                        <Stack.Screen name="GenericAlbumDebug" component={GenericAlbumDebug} />
                        <Stack.Screen name="GenericAlbum" component={GenericAlbum} />
                        <Stack.Screen name="Friends" component={FriendsScreen} />
                        <Stack.Screen name="Login" component={LoginScreen} />
                        <Stack.Screen name="CreateAccount1" component={CreateOnline1} />
                        <Stack.Screen name="CreateAccount2" component={CreateAccount2} />
                        <Stack.Screen name="Debug" component={DebugScreen} />
                    </Stack.Navigator>
                </View>
                {currentRoute !== 'CreateAccount1' && currentRoute !== 'CreateAccount2' && currentRoute !== 'Login' && <Footer />}
            </View>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFDF9',
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        flex: 1,
        marginBottom: 72, // Reserve space for the footer height
    },
});



//App.js test file, use to view Generic Album Page Component
/*
import { View } from 'react-native';

import GenericAlbumPage from './src/screens/GenericAlbumTest.js'


export default function App() {
  return (
    <View style={{ flex: 1 , backgroundColor: 'white'}}>
        <GenericAlbumPage/>
    </View>
  );
}*/