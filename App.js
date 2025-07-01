
//original app.js file

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  FreeWriteScreen,
  ChallengeScreen,
  CreateStoryScreen,
  AlbumsScreen,
  FriendsScreen,
} from './src/screens/initialscreens';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="FreeWrite" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="FreeWrite" component={FreeWriteScreen} />
        <Stack.Screen name="Challenge" component={ChallengeScreen} />
        <Stack.Screen name="CreateStory" component={CreateStoryScreen} />
        <Stack.Screen name="Albums" component={AlbumsScreen} />
        <Stack.Screen name="Friends" component={FriendsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


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