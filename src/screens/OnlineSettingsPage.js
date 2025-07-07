
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function OnlineSettingsPage() {
  const navigation = useNavigation();

  const handleGoToLogin = () => {
    navigation.navigate('Login');
  };

  const handleGoToEdit = () => {
    navigation.navigate('EditOnlineSettingsPage');
  };
  const handleReset = () => {
    navigation.navigate('ResetPassword');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Account</Text>

      <Text style={styles.label}>Username</Text>
      <Text style={styles.value}>supercoolwriter69</Text>

      <Text style={styles.label}>Email</Text>
      <Text style={styles.value}>supercoolwriter69@gmail.com</Text>

      <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
        <Text style={styles.resetButtonText}>Reset Password</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Date Joined</Text>
      <Text style={styles.value}>06/21/2025</Text>

      <Text style={styles.label}>Bio</Text>
      <Text style={styles.value}>Short blurb about writing</Text>

      <Text style={styles.label}>Daily Challenge Auto-Delete</Text>
      <View style={styles.optionRow}>
        <Text style={styles.option}>30 Days</Text>
        <Text style={[styles.option, styles.selectedOption]}>1 Year</Text>
        <Text style={styles.option}>None</Text>
      </View>

      <TouchableOpacity style={styles.editButton} onPress={handleGoToEdit}>
        <Text style={styles.editButtonText}>Edit Your Account</Text>
      </TouchableOpacity>

      <Text style={styles.link} onPress={handleGoToLogin}>Logout</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Crimson Text',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 22,
    fontFamily: 'Crimson Text',
    fontWeight: '600',
    marginTop: 20,
  },
  value: {
    fontSize: 20,
    fontFamily: 'Crimson Text',
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
    fontFamily: 'Crimson Text',
    fontWeight: '700',
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
    fontFamily: 'Crimson Text',
    color: '#aaa',
    overflow: 'hidden',
  },
  selectedOption: {
    backgroundColor: '#ccc',
    color: '#000',
    fontWeight: '700',
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
    fontFamily: 'Crimson Text',
    fontSize: 22,
    fontWeight: '600',
    color: 'white',
  },
  link: {
    fontSize: 18,
    fontFamily: 'Crimson Text',
    color: '#0056B3',
    textAlign: 'center',
    marginTop: 24,
    textDecorationLine: 'underline',
  },
});
