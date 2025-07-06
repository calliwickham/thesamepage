import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function PennameScreen() {
  const [penname, setPenname] = useState('');
  const navigation = useNavigation();

  const handleFinish = () => {
    if (penname.trim() === '') {
      Alert.alert('Please enter your penname.');
      return;
    }

    Alert.alert('Penname saved successfully!');
    navigation.navigate('OfflineHomepage'); // or 'OnlineHomepage' depending on flow
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.title}>Penname</Text>
        <View style={styles.divider} />

        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          placeholderTextColor="#bbb"
          value={penname}
          onChangeText={setPenname}
        />

        <TouchableOpacity style={styles.button} onPress={handleFinish}>
          <Text style={styles.buttonText}>Finish</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 16,
  },
  box: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 6,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    fontFamily: 'Crimson Text',
    marginBottom: 12,
  },
  divider: {
    height: 1.5,
    backgroundColor: 'black',
    marginBottom: 16,
  },
  input: {
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    fontSize: 18,
    fontFamily: 'Crimson Text',
    paddingHorizontal: 14,
    marginBottom: 24,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  button: {
    backgroundColor: '#FFD429',
    borderRadius: 30,
    paddingVertical: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'Crimson Text',
    color: 'black',
  },
});
