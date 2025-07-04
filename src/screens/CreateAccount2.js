import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

export default function CreateAccount2({ navigation }) {
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    Alert.alert('Account successfully created');
    navigation.navigate('OnlineHomepage');
  };

  return (
    <KeyboardAvoidingView
      style={styles.wrapper}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Add Email?</Text>
        <View style={styles.divider} />

        <Text style={styles.info}>
          Adding an email address allows you to reset your password if you forget it.
        </Text>

        <Text style={styles.label}>Email (optional):</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="example@mail.com"
          placeholderTextColor="#CCC"
          keyboardType="email-address"
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>{email ? 'Continue' : 'No Thanks'}</Text>
        </TouchableOpacity>
      </View>

    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'space-between',
  },
  container: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'Crimson Text',
    marginBottom: 10,
  },
  divider: {
    height: 2,
    backgroundColor: '#000',
    marginBottom: 20,
  },
  info: {
    fontSize: 22,
    fontFamily: 'Crimson Text',
    marginBottom: 16,
    color: '#000',
  },
  label: {
    fontSize: 22,
    fontFamily: 'Crimson Text',
    marginBottom: 8,
    color: '#000',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    fontSize: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
    fontFamily: 'Crimson Text',
  },
  button: {
    backgroundColor: '#FFD12D',
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    fontFamily: 'Crimson Text',
    fontSize: 22,
    fontWeight: '700',
    color: '#000',
  },
  note: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'Crimson Text',
    fontWeight: '600',
    color: '#F00',
    marginBottom: 20,
  },
});
