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

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <View style={{ flex: 1 }}>
        <NavigationContainer>
            <Stack.Navigator initialRouteName="FreeWrite" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="FreeWrite" component={FreeWriteScreen} />
            <Stack.Screen name="Challenge" component={ChallengeScreen} />
            <Stack.Screen name="CreateStory" component={CreateStoryScreen} />
            <Stack.Screen name="Albums" component={AlbumsScreen} />
            <Stack.Screen name="Friends" component={FriendsScreen} />
            </Stack.Navigator>
        </NavigationContainer>
        <View style={{ position: 'absolute', bottom: 30, left: 30 }}>
            <Text>Hello</Text>
            <HomeIcon width={29} height={31} />
            <AlbumsIcon width={35} height={31} />
      </View>
    </View>
  );
}

