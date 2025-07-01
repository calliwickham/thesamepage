import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  FreeWriteScreen,
  ChallengeScreen,
  CreateStoryScreen,
  AlbumsScreen,
  FriendsScreen,
} from './src/screens/initialscreens';
import { View, Text } from 'react-native';
import HomeIcon from './src/components/testicons/HomeIcon';
import AlbumsIcon from './src/components/testicons/AlbumsIcon';

import GenericAlbumPage from './src/screens/GenericAlbumTest.js'


export default function App() {
  return (
    <View style={{ flex: 1 , backgroundColor: 'white'}}>
        <GenericAlbumPage/>
    </View>
  );
}

