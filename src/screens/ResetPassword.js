import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // You can switch to another icon lib if needed

export default function ResetPassword() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Back Arrow */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={28} color="#000" />
      </TouchableOpacity>

      <Text style={styles.title}>Reset Password</Text>

      <Text style={styles.message}>
        We’re sorry, right now this feature is not available because our app is in development.
        But it will be soon, so please check back...!
      </Text>

      <TextInput
        style={styles.input}
        placeholder="example@mail.com"
        placeholderTextColor="#aaa"
        editable={false}
      />

      <TouchableOpacity style={styles.sendButton} disabled>
        <Text style={styles.sendButtonText}>Send</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
  },
  title: {
    fontSize: 28,
    fontFamily: 'CrimsonText-Bold',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
  },
  message: {
    fontSize: 18,
    fontFamily: 'CrimsonText-Regular',
    textAlign: 'center',
    marginBottom: 40,
  },
  input: {
    backgroundColor: '#ddd',
    borderRadius: 12,
    padding: 14,
    fontSize: 18,
    fontFamily: 'CrimsonText-Regular',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  sendButton: {
    backgroundColor: '#ddd',
    paddingVertical: 14,
    borderRadius: 40,
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'CrimsonText-Bold',
    fontWeight: '600',
  },
});
