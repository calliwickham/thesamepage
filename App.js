import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, StyleSheet } from 'react-native';

import {
  FreeWriteScreen,
  ChallengeScreen,
  CreateStoryScreen,
  AlbumsScreen,
  FriendsScreen,
} from './src/screens/initialscreens';

import Logo from './src/newcomps/Logo';

const Stack = createNativeStackNavigator();

// Wraps any screen with the floating top-right logo
const ScreenWrapper = ({ children }) => (
  <View style={{ flex: 1 }}>
    <View style={styles.logoContainer}>
      <Logo width={40} height={40} />
    </View>
    {children}
  </View>
);

// Wrap each screen to include the logo
const FreeWriteWithLogo = () => (
  <ScreenWrapper>
    <FreeWriteScreen />
  </ScreenWrapper>
);

const ChallengeWithLogo = () => (
  <ScreenWrapper>
    <ChallengeScreen />
  </ScreenWrapper>
);

const CreateStoryWithLogo = () => (
  <ScreenWrapper>
    <CreateStoryScreen />
  </ScreenWrapper>
);

const AlbumsWithLogo = () => (
  <ScreenWrapper>
    <AlbumsScreen />
  </ScreenWrapper>
);

const FriendsWithLogo = () => (
  <ScreenWrapper>
    <FriendsScreen />
  </ScreenWrapper>
);

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="FreeWrite" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="FreeWrite" component={FreeWriteWithLogo} />
        <Stack.Screen name="Challenge" component={ChallengeWithLogo} />
        <Stack.Screen name="CreateStory" component={CreateStoryWithLogo} />
        <Stack.Screen name="Albums" component={AlbumsWithLogo} />
        <Stack.Screen name="Friends" component={FriendsWithLogo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1000,
  },
});
