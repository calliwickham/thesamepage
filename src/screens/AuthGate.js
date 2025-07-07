import { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../constants/firebaseConfig'; // adjust path if needed
import { useNavigation } from '@react-navigation/native';

export default function AuthGate({ navigation }) {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
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