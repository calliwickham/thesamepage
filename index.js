import 'react-native-gesture-handler';
import { registerRootComponent } from 'expo';
import React from 'react';
import App from './App';
import { UserProvider } from './src/contexts/UserContext';

const Root = () => (
  <UserProvider>
    <App />
  </UserProvider>
);

registerRootComponent(Root);
