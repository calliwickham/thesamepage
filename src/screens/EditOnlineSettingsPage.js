import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

export default function EditOnlineSettingsPage() {
  const navigation = useNavigation();
  const [selectedDeleteOption, setSelectedDeleteOption] = useState('1 Year'); // default selected

  const handleRedirect = () => {
    navigation.navigate('Login');
  };
  const handleGoBack = () => {
    navigation.navigate('OnlineSettingsPage');
  };
  const handleReset = () => {
    navigation.navigate('ResetPassword');
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <View style={styles.container}>
        <Text style={styles.header}>Your Account</Text>

        <Text style={styles.label}>Username</Text>
        <TextInput style={styles.input} value="supercoolwriter69" editable />

        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} value="supercoolwriter69@gmail.com" editable />

        <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
          <Text style={styles.resetText}>Reset Password</Text>
        </TouchableOpacity>

        <Text style={styles.label}>Date Joined</Text>
        <TextInput style={[styles.input, styles.disabledInput]} value="06/21/2025" editable={false} />

        <Text style={styles.label}>Bio</Text>
        <TextInput
          style={[styles.input, styles.bioInput]}
          value="Short blurb about writing"
          multiline
        />

        <Text style={styles.label}>Daily Challenge Auto-Delete</Text>
        <View style={styles.autoDeleteRow}>
          {['30 Days', '1 Year', 'None'].map(option => (
            <TouchableOpacity
              key={option}
              style={[
                styles.autoDeleteButton,
                selectedDeleteOption === option && styles.activeButton
              ]}
              onPress={() => setSelectedDeleteOption(option)}
            >
              <Text
                style={[
                  styles.autoDeleteText,
                  selectedDeleteOption === option && styles.activeText
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleGoBack}>
          <Text style={styles.saveText}>Save Your Changes</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteButton} onPress={handleRedirect}>
          <Text style={styles.deleteText}>Delete My Account</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fff',
    flex: 1,
  },
  header: {
    fontSize: 32,
    fontFamily: 'Crimson Text',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 20,
    fontFamily: 'Crimson Text',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#fff',
    fontFamily: 'Crimson Text',
    fontSize: 18,
    borderRadius: 12,
    padding: 12,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  disabledInput: {
    backgroundColor: '#f0f0f0',
    color: '#999',
  },
  bioInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  resetText: {
    fontSize: 18,
    fontFamily: 'Crimson Text',
    fontWeight: '700',
    color: '#000',
  },
  autoDeleteRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  autoDeleteButton: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    borderColor: '#000',
    borderWidth: 1,
    backgroundColor: '#fff',
    elevation: 2,
  },
  autoDeleteText: {
    fontFamily: 'Crimson Text',
    fontSize: 16,
    fontWeight: '600',
    color: '#aaa',
  },
  activeButton: {
    backgroundColor: '#ccc',
  },
  activeText: {
    color: '#000',
  },
  saveText: {
    color: '#FFF4E2',
    fontSize: 20,
    fontFamily: 'Crimson Text',
    fontWeight: '700',
  },
  deleteText: {
    color: '#000',
    fontSize: 20,
    fontFamily: 'Crimson Text',
    fontWeight: '700',
  },
  resetButton: {
    backgroundColor: '#FFD12D',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  saveButton: {
    backgroundColor: '#10471B',
    paddingVertical: 16,
    borderRadius: 40,
    alignItems: 'center',
    marginTop: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  deleteButton: {
    backgroundColor: '#D60000',
    paddingVertical: 16,
    borderRadius: 40,
    alignItems: 'center',
    marginTop: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});
