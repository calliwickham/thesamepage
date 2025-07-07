// src/contexts/UserContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userType, setUserType] = useState(null); // 'online' or 'offline'

  // Load stored userType from AsyncStorage
  useEffect(() => {
    const loadUserType = async () => {
      const storedType = await AsyncStorage.getItem('userType');
      if (storedType) setUserType(storedType);
    };
    loadUserType();
  }, []);

  // Persist userType to AsyncStorage when it changes
  useEffect(() => {
    if (userType) {
      AsyncStorage.setItem('userType', userType);
    }
  }, [userType]);

  return (
    <UserContext.Provider value={{ userType, setUserType }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
