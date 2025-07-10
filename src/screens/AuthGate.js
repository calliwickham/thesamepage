import { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../constants/firebaseConfig'; // adjust path if needed
import { useNavigation } from '@react-navigation/native';
import { UserProvider, useUser } from '../contexts/UserContext';

export default function AuthGate({ navigation }) {

    const { userType, setUserType } = useUser();
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user && userType !== 'online'){
                navigation.replace('OfflineHomepage');
            }
            else if (user) {
                navigation.replace('OnlineHomepage');
            } else {
                navigation.replace('Login');
            }
        });

        return unsubscribe;
    }, [navigation]);

    return (
        <View >
            <ActivityIndicator size="large" color="#BB77FF" />
        </View>
    );
}