import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import Button from '../newcomps/Button';
import { auth, firestore } from '../constants/firebaseConfig.js'
import { collection, getDocs, query, where, addDoc } from 'firebase/firestore';
import { useUser } from '../contexts/UserContext';

export default function AddFriends() {
  const [username, setUsername] = useState('');
  const { user } = useUser();

  const handleSendRequest = async () => {
    try {
      const usersRef = collection(firestore, 'users');
      const q = query(usersRef, where('username', '==', username));
      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        Alert.alert('No user found');
        return;
      }

      const recipient = snapshot.docs[0];
      await addDoc(collection(firestore, `users/${recipient.id}/friendRequests`), {
        from: user.uid,
        timestamp: new Date()
      });

      Alert.alert('Friend request sent!');
    } catch (err) {
      console.error('Error sending request:', err);
      Alert.alert('Error', err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Friend's Username:</Text>
      <TextInput
        value={username}
        onChangeText={setUsername}
        style={styles.input}
        placeholder="Search username..."
      />
      <Button onPress={handleSendRequest}>Send Friend Request</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  label: { fontFamily: 'Crimson Text', fontSize: 20, marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    fontFamily: 'Crimson Text',
    padding: 10,
    marginBottom: 14,
  },
});
