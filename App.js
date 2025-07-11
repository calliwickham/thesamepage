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

import GenericAlbum from './src/screens/WritingScreens/AlbumScreens/GenericAlbum.js';
import Albums from './src/screens/WritingScreens/AlbumScreens/Albums.js';
import FileViewer from './src/screens/WritingScreens/AlbumScreens/FileViewer.js';
import OnlineHomepage from './src/screens/Homepages/OnlineHomepage.js';
import OfflineHomepage from './src/screens/Homepages/OfflineHomepage.js';
import LoginScreen from './src/screens/LoginScreens/login.js';
import CreateOnline1 from './src/screens/LoginScreens/CreateAccount1.js';
import CreateAccount2 from './src/screens/LoginScreens/CreateAccount2.js';
import OnlineSettingsPage from './src/screens/SettingsScreens/OnlineSettingsPage.js';
import EditOfflineSettingsPage from './src/screens/SettingsScreens/EditOfflineSettingsPage.js';
import ResetPassword from './src/screens/VerificationScreens/ResetPassword.js';
import OfflineSettingsPage from './src/screens/SettingsScreens/OfflineSettingsPage.js';
import EditOnlineSettingsPage from './src/screens/SettingsScreens/EditOnlineSettingsPage.js';
import FreeWriteScreen1 from './src/screens/WritingScreens/FreeWriteScreens/FreeWriteInProgress.js';
import FreeWrite from './src/screens/WritingScreens/FreeWriteScreens/FreeWrite.js';
import DailyChallengeScreen from './src/screens/WritingScreens/DailyScreens/DailyChallengeScreen.js';
import MyFriends from './src/screens/FriendsScreens/MyFriends.js';
import EditFriends from './src/screens/FriendsScreens/EditFriends.js';
import AddFriends from './src/screens/FriendsScreens/AddFriends.js';
import FriendRequests from './src/screens/FriendsScreens/FriendRequests.js';
import CollaborativeWritingWIP from './src/screens/WritingScreens/CollabScreens/CollaborativeWritingWIP.js';
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
                            <Stack.Screen name="FreeWriteScreen2" component={FreeWrite} />
                            <Stack.Screen name="FreeWriteScreen1" component={FreeWriteScreen1} />
                            <Stack.Screen name="AuthGate" component={AuthGate} />
                            <Stack.Screen name="EditOfflineSettingsPage" component={EditOfflineSettingsPage} />
                            <Stack.Screen name="OfflineSettingsPage" component={OfflineSettingsPage} />
                            <Stack.Screen name="ResetPassword" component={ResetPassword} />
                            <Stack.Screen name="EditOnlineSettingsPage" component={EditOnlineSettingsPage} />
                            <Stack.Screen name="OnlineSettingsPage" component={OnlineSettingsPage} />
                            <Stack.Screen name="OnlineHomepage" component={OnlineHomepage} />
                            <Stack.Screen name="OfflineHomepage" component={OfflineHomepage} />
                            <Stack.Screen name="Albums" component={Albums} />
                            <Stack.Screen name="FileViewer" component={FileViewer} />
                            <Stack.Screen name="GenericAlbum" component={GenericAlbum} />
                            <Stack.Screen name="Login" component={LoginScreen} />
                            <Stack.Screen name="CreateAccount1" component={CreateOnline1} />
                            <Stack.Screen name="CreateAccount2" component={CreateAccount2} />
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
