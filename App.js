import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import Header from './src/newcomps/Header';
import Footer from './src/newcomps/Footer';
import OfflineFooter from './src/newcomps/OfflineFooter';
import { UserProvider, useUser } from './src/contexts/UserContext';

import {
    DebugScreen,
    ChallengeScreen,
    CreateStoryScreen,
    FriendsScreen,
} from './src/screens/initialscreens';

import GenericAlbumDebug from './src/screens/GenericAlbumTest';
import GenericAlbum from './src/screens/GenericAlbum';
import Albums from './src/screens/Albums.js';
import FileViewer from './src/screens/FileViewer';
import OnlineHomepage from './src/screens/OnlineHomepage';
import OfflineHomepage from './src/screens/OfflineHomepage';
import LoginScreen from './src/screens/login';
import CreateOnline1 from './src/screens/CreateAccount1';
import CreateAccount2 from './src/screens/CreateAccount2';
import OnlineSettingsPage from './src/screens/OnlineSettingsPage.js';
import EditOnlineSettingsPage from './src/screens/EditOnlineSettingsPage.js';
import ResetPassword from './src/screens/ResetPassword.js';
import OfflineSettingsPage from './src/screens/OfflineSettingsPage.js';
import EditOfflineSettingsPage from './src/screens/EditOfflineSettingsPage.js';
import FreeWriteScreen1 from './src/screens/FreeWriteScreen1.js';
import FreeWriteScreen2 from './src/screens/FreeWriteScreen2.js';
import FreeWriteInspireMe from './src/screens/FreeWriteInspireMe.js';
import DailyChallengeScreen from './src/screens/DailyChallengeScreen.js';
import MyFriends from './src/screens/MyFriends.js';
import EditFriends from './src/screens/EditFriends.js';
import AddFriends from './src/screens/AddFriends.js';
import FriendRequests from './src/screens/FriendRequests.js';
import CollaborativeWritingWIP from './src/newcomps/CollaborativeWritingWIP.js';
import AuthGate from './src/screens/AuthGate.js'

import { onAuthStateChanged } from "firebase/auth";
import { auth } from './src/constants/firebaseConfig.js'

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

    const navigationRef = useNavigationContainerRef();
    const [currentRoute, setCurrentRoute] = React.useState(null);
    const [isAuthenticated, setIsAuthenticated] = React.useState(null);
    const { userType, setUserType } = useUser();


    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/auth.user
                const uid = user.uid;
                console.log("User is logged in.")
                // ...
            } else {
                // User is signed out
                console.log("User is not logged in.")
                // ...
                setIsAuthenticated(false);
            }
        });
        return unsubscribe;
    }, []);

    const hideFooterRoutes = ['CreateAccount1', 'CreateAccount2', 'Login'];
    const shouldShowFooter = !hideFooterRoutes.includes(currentRoute);

    if (!fontsLoaded) {
        return (
            <View style={styles.loading}>
                <ActivityIndicator size="large" color="#BB77FF" />
            </View>
        );
    }

    return (
        <GestureHandlerRootView style={styles.flex}>
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
                            initialRouteName="AuthGate"
                            screenOptions={{ headerShown: false }}
                        >
                            <Stack.Screen name="CollabWIP" component={CollaborativeWritingWIP} />
                            <Stack.Screen name="FriendRequests" component={FriendRequests} />
                            <Stack.Screen name="AddFriends" component={AddFriends} />
                            <Stack.Screen name="EditFriends" component={EditFriends} />
                            <Stack.Screen name="MyFriends" component={MyFriends} />
                            <Stack.Screen name="DailyChallengeScreen" component={DailyChallengeScreen} />
                            <Stack.Screen name="FreeWriteInspireMe" component={FreeWriteInspireMe} />
                            <Stack.Screen name="FreeWriteScreen2" component={FreeWriteScreen2} />
                            <Stack.Screen name="FreeWriteScreen1" component={FreeWriteScreen1} />
                            <Stack.Screen name="AuthGate" component={AuthGate} />
                            <Stack.Screen name="EditOfflineSettingsPage" component={EditOfflineSettingsPage} />
                            <Stack.Screen name="OfflineSettingsPage" component={OfflineSettingsPage} />
                            <Stack.Screen name="ResetPassword" component={ResetPassword} />
                            <Stack.Screen name="EditOnlineSettingsPage" component={EditOnlineSettingsPage} />
                            <Stack.Screen name="OnlineSettingsPage" component={OnlineSettingsPage} />
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
                    {currentRoute !== 'CreateAccount1' && currentRoute !== 'CreateAccount2' && currentRoute !== 'Login' && (
                      userType === 'online' ? <Footer /> : <OfflineFooter />
                    )}
                </View>
            </NavigationContainer>
        </GestureHandlerRootView>
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
        marginBottom: 72, // Reserve space for the footer
    },
});
