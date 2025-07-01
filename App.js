import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';

import Header from './src/newcomps/Header';
import SettingsIcon from './src/newcomps/SettingsIcon'; // adjust path if needed

import {
  FreeWriteScreen,
  ChallengeScreen,
  CreateStoryScreen,
  AlbumsScreen,
  FriendsScreen,
} from './src/screens/initialscreens';

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    Italianno: require('./assets/fonts/Italianno-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#BB77FF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="FreeWrite"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="FreeWrite" component={FreeWriteScreen} />
          <Stack.Screen name="Challenge" component={ChallengeScreen} />
          <Stack.Screen name="CreateStory" component={CreateStoryScreen} />
          <Stack.Screen name="Albums" component={AlbumsScreen} />
          <Stack.Screen name="Friends" component={FriendsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <View style={styles.settingsIcon}>
        <SettingsIcon width={39} height={39} />
      </View>
    </View>
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
  settingsIcon: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});
