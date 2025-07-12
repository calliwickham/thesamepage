import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
  ScrollView,
  Pressable,
  Linking,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth, firestore } from '../../constants/firebaseConfig';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { deleteUser } from 'firebase/auth';
import CheckBoxIcon from '../../newcomps/CheckBoxIcon'; // Make sure this exists

import { storeLocal } from '../../constants/storeLocal.js'

export default function EditOfflineSettingsPage() {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [selectedOption, setSelectedOption] = useState('1 Year');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showConvertModal, setShowConvertModal] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const user = auth.currentUser;
      if (!user) return;
      try {
        const userDoc = await getDoc(doc(firestore, 'Users', user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setUsername(data.penname || '');
          setSelectedOption(data.autoDelete || '1 Year');
        }
      } catch (err) {
        console.error('Error loading user info:', err);
      }
    };

    fetchUserInfo();
  }, []);

  const handleSave = async () => {
    const user = auth.currentUser;
    if (!user) return;
    try {
      await updateDoc(doc(firestore, 'Users', user.uid), {
        penname: username,
        autoDelete: selectedOption,
      });
      await storeLocal("penname", username);
      navigation.navigate('OfflineSettingsPage');
    } catch (err) {
      console.error('Save error:', err);
    }
  };

  const handleDelete = async () => {
    const user = auth.currentUser;
    if (!user) return;
    try {
      await deleteDoc(doc(firestore, 'Users', user.uid));
      await deleteUser(user);
      navigation.replace('Login');
    } catch (err) {
      Alert.alert('Delete Error', err.message);
    }
  };

  const handleConvert = () => {
    if (!isChecked) {
      setShowConvertModal(true);
    } else {
      navigation.navigate('CreateAccount2');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Edit Your Account</Text>

      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />

      <Text style={styles.label}>Daily Challenge Auto-Delete</Text>
      <View style={styles.autoDeleteRow}>
        {['30 Days', '1 Year', 'None'].map(option => (
          <TouchableOpacity
            key={option}
            style={[
              styles.autoDeleteButton,
              selectedOption === option && styles.selected,
            ]}
            onPress={() => setSelectedOption(option)}
          >
            <Text
              style={[
                styles.autoDeleteText,
                selectedOption === option && styles.selectedText,
              ]}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveText}>Save Your Changes</Text>
      </TouchableOpacity>

      

      <View style={styles.divider} />

      <Text style={styles.convertTitle}>Convert to an Online Account?</Text>
      <View style={styles.checkboxContainer}>
        <Pressable onPress={() => setIsChecked(!isChecked)}>
          {isChecked ? <CheckBoxIcon /> : <View style={styles.uncheckedBox} />}
        </Pressable>
        <Text style={styles.checkboxText}>
          By checking this box, you acknowledge that your account will be online, allowing you to collaborate, connect, and communicate with other users. You also agree to follow our{' '}
          <Text
            style={styles.link}
            onPress={() => Linking.openURL('https://example.com/community-guidelines')}
          >
            Community Guidelines
          </Text>{' '}
          and to interact respectfully, avoiding any behavior that could make others feel uncomfortable.
        </Text>
      </View>

      <TouchableOpacity style={styles.convertButton} onPress={handleConvert}>
        <Text style={styles.convertText}>Convert</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteButton} onPress={() => setShowDeleteModal(true)}>
              <Text style={styles.deleteText}>Delete My Account</Text>
            </TouchableOpacity>
      {/* Convert Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showConvertModal}
        onRequestClose={() => setShowConvertModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Are you sure?</Text>
            <Text style={styles.modalMessage}>
              You must check the agreement box to proceed.
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.goBackButton}
                onPress={() => setShowConvertModal(false)}
              >
                <Text style={styles.goBackText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Delete Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showDeleteModal}
        onRequestClose={() => setShowDeleteModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Are You Sure?</Text>
            <Text style={styles.modalMessage}>
              This will permanently delete your account.
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.goBackButton}
                onPress={() => setShowDeleteModal(false)}
              >
                <Text style={styles.goBackText}>Go Back</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteConfirmButton}
                onPress={handleDelete}
              >
                <Text style={styles.deleteText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingBottom: 60,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 32,
    fontFamily: 'CrimsonText-Bold',
    fontWeight: '500',
    marginBottom: 20,
  },
  label: {
    fontSize: 20,
    fontFamily: 'CrimsonText-SemiBold',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#fff',
    fontFamily: 'CrimsonText-Regular',
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
    fontFamily: 'CrimsonText-SemiBold',
    fontSize: 16,
    fontWeight: '600',
    color: '#aaa',
  },
  selected: {
    backgroundColor: '#ccc',
  },
  selectedText: {
    color: '#000',
  },
  saveButton: {
    backgroundColor: '#10471B',
    paddingVertical: 16,
    borderRadius: 40,
    alignItems: 'center',
    marginTop: 20,
    elevation: 5,
  },
  saveText: {
    color: '#FFF4E2',
    fontSize: 20,
    fontFamily: 'CrimsonText-Bold',
    fontWeight: '600',
  },
  deleteButton: {
    backgroundColor: '#D60000',
    paddingVertical: 16,
    borderRadius: 40,
    alignItems: 'center',
    marginTop: 20,
    elevation: 5,
  },
  deleteText: {
    color: '#000',
    fontSize: 20,
    fontFamily: 'CrimsonText-Bold',
    fontWeight: '600',
  },
  divider: {
    height: 2,
    backgroundColor: '#000',
    marginVertical: 24,
  },
  convertTitle: {
    fontSize: 22,
    fontFamily: 'CrimsonText-Bold',
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  uncheckedBox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 4,
    marginRight: 10,
    marginTop: 4,
  },
  checkboxText: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'CrimsonText-Regular',
    color: '#000',
  },
  link: {
    fontSize: 16,
    fontFamily: 'CrimsonText-Regular',
    color: '#0056B3',
    textDecorationLine: 'underline',
  },
  convertButton: {
    backgroundColor: '#FFD12D',
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
    elevation: 5,
  },
  convertText: {
    fontSize: 20,
    fontFamily: 'CrimsonText-SemiBold',
    fontWeight: '600',
    color: '#000',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0, bottom: 0, left: 0, right: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  modalBox: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 12,
    width: '85%',
    elevation: 8,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontFamily: 'CrimsonText-Bold',
    fontWeight: '500',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 18,
    fontFamily: 'CrimsonText-Regular',
    textAlign: 'center',
    marginBottom: 24,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  goBackButton: {
    backgroundColor: '#FFD12D',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 40,
    elevation: 3,
  },
  goBackText: {
    fontSize: 18,
    fontFamily: 'CrimsonText-Bold',
    fontWeight: '500',
    color: '#000',
  },
  deleteConfirmButton: {
    backgroundColor: '#D60000',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 40,
    marginLeft: 12,
    elevation: 3,
  },
});