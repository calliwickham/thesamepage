/*import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';

import Header from './src/newcomps/Header';
import Footer from './src/newcomps/Footer';

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
      <View style={styles.content}>
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
      </View>
      <Footer />
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
  content: {
    flex: 1,
    marginBottom: 72, // Reserve space for the footer height
  },
});

*/

//App.js test file, use to view Generic Album Page Component

import { View } from 'react-native';

import GenericAlbumPage from './src/screens/GenericAlbumTest.js'


export default function App() {
  return (
    <View style={{ flex: 1 , backgroundColor: 'white'}}>
        <GenericAlbumPage/>
    </View>
  );
}