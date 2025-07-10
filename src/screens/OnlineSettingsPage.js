import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { signOut } from 'firebase/auth';
import { auth, firestore } from '../constants/firebaseConfig';
import { clearLocal } from '../constants/storeLocal.js';
import { doc, getDoc } from 'firebase/firestore';

export default function OnlineSettingsPage() {
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState({
    penname: '',
    email: '',
    joined: '',
    bio: '',
    autoDelete: '1 Year'
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      const user = auth.currentUser;
      if (!user) return;

      try {
        const userDoc = await getDoc(doc(firestore, 'Users', user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setUserInfo({
            penname: data.penname || '',
            email: data.email || user.email || '',
            joined: data.joined ? new Date(data.joined.seconds * 1000).toLocaleDateString() : '',
            bio: data.bio || '',
            autoDelete: data.autoDelete || '1 Year',
          });
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      await clearLocal("penname");
      navigation.replace('Login');
      alert('Logged out');
      //console.log('User signed out');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const handleGoToEdit = () => {
    navigation.navigate('EditOnlineSettingsPage');
  };

  const handleReset = () => {
    navigation.navigate('ResetPassword');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Your Account</Text>

      <Text style={styles.label}>Username</Text>
      <Text style={styles.value}>{userInfo.penname}</Text>

      <Text style={styles.label}>Email</Text>
      <Text style={styles.value}>{userInfo.email}</Text>

      <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
        <Text style={styles.resetButtonText}>Reset Password</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Date Joined</Text>
      <Text style={styles.value}>{userInfo.joined}</Text>

      <Text style={styles.label}>Bio</Text>
      <Text style={styles.value}>{userInfo.bio}</Text>

      <Text style={styles.label}>Daily Challenge Auto-Delete</Text>
      <View style={styles.optionRow}>
        <Text style={[styles.option, userInfo.autoDelete === '30 Days' && styles.selectedOption]}>30 Days</Text>
        <Text style={[styles.option, userInfo.autoDelete === '1 Year' && styles.selectedOption]}>1 Year</Text>
        <Text style={[styles.option, userInfo.autoDelete === 'None' && styles.selectedOption]}>None</Text>
      </View>

      <TouchableOpacity style={styles.editButton} onPress={handleGoToEdit}>
        <Text style={styles.editButtonText}>Edit Your Account</Text>
      </TouchableOpacity>

      <Text style={styles.link} onPress={handleLogout}>Logout</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    flex: 1,
  },
  title: {
    fontSize: 32,
    fontFamily: 'CrimsonText-Bold',
    fontWeight: '500',
  },
  label: {
    fontSize: 22,
    fontFamily: 'CrimsonText-SemiBold',
    fontWeight: '600',
    marginTop: 20,
  },
  value: {
    fontSize: 20,
    fontFamily: 'CrimsonText-Regular',
    marginTop: 6,
    marginLeft: 10,
  },
  resetButton: {
    backgroundColor: '#FFD12D',
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 30,
    alignItems: 'center',
    marginTop: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  resetButtonText: {
    fontSize: 20,
    fontFamily: 'CrimsonText-Bold',
    fontWeight: '600',
    color: '#000',
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 12,
  },
  option: {
    backgroundColor: '#eee',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 18,
    fontSize: 16,
    fontFamily: 'CrimsonText-Regular',
    color: '#aaa',
    overflow: 'hidden',
  },
  selectedOption: {
    backgroundColor: '#ccc',
    color: '#000',
    fontFamily: 'CrimsonText-Bold',
    fontWeight: '600',
  },
  editButton: {
    backgroundColor: '#0B3D0B',
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  editButtonText: {
    fontFamily: 'CrimsonText-Bold',
    fontSize: 22,
    fontWeight: '600',
    color: 'white',
  },
  link: {
    fontSize: 18,
    fontFamily: 'CrimsonText-Regular',
    color: '#0056B3',
    textAlign: 'center',
    marginVertical: 24,
    textDecorationLine: 'underline',
    marginBottom: 40,
  },
});
