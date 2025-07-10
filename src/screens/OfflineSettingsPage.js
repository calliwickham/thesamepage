import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Linking,
  Modal,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import CheckBoxIcon from '../newcomps/CheckBoxIcon';
import { signOut } from 'firebase/auth';
import { auth, firestore } from '../constants/firebaseConfig';
import { clearLocal } from '../constants/storeLocal.js';
import { ScrollView } from 'react-native-gesture-handler';
import { doc, getDoc } from 'firebase/firestore';

export default function OfflineSettingsPage() {
  const navigation = useNavigation();
  const [isChecked, setIsChecked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [userInfo, setUserInfo] = useState({
    penname: '',
    joined: '',
    autoDelete: '1 Year',
  });

  useFocusEffect(
    useCallback(() => {
      const fetchOfflineInfo = async () => {
        const user = auth.currentUser;
        if (!user) return;

        try {
          const userDoc = await getDoc(doc(firestore, 'Users', user.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            setUserInfo({
              penname: data.penname || '',
              joined: data.joined ? new Date(data.joined.seconds * 1000).toLocaleDateString() : '',
              autoDelete: data.autoDelete || '1 Year',
            });
          }
        } catch (err) {
          console.error('Error loading offline user info:', err);
        }
      };

      fetchOfflineInfo();
    }, [])
  );

  const handleLogout = async () => {
    try {
      await signOut(auth);
      await clearLocal("penname");
      navigation.replace('Login');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const handleConvert = () => {
    if (!isChecked) {
      setShowModal(true);
    } else {
      navigation.navigate('CreateAccount2');
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Your Account</Text>

        <Text style={styles.label}>Username</Text>
        <Text style={styles.value}>{userInfo.penname}</Text>

        <Text style={styles.label}>Date Joined</Text>
        <Text style={styles.value}>{userInfo.joined}</Text>

        <Text style={styles.label}>Daily Challenge Auto-Delete</Text>
        <View style={styles.autoDeleteRow}>
          <Text style={[styles.autoDeleteButtonDisabled, userInfo.autoDelete === '30 Days' && styles.selected]}>30 Days</Text>
          <Text style={[styles.autoDeleteButtonDisabled, userInfo.autoDelete === '1 Year' && styles.selected]}>1 Year</Text>
          <Text style={[styles.autoDeleteButtonDisabled, userInfo.autoDelete === 'None' && styles.selected]}>None</Text>
        </View>

        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate('EditOfflineSettingsPage')}
        >
          <Text style={styles.editButtonText}>Edit Your Account</Text>
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

        <TouchableOpacity
          style={styles.convertButton}
          onPress={handleConvert}
        >
          <Text style={styles.convertText}>Convert</Text>
        </TouchableOpacity>

        <Text style={styles.link} onPress={handleLogout}>Logout</Text>

        {/* Warning Modal */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={showModal}
          onRequestClose={() => setShowModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.popupBox}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowModal(false)}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
              <Text style={styles.popupTitle}>Are you sure?</Text>
              <Text style={styles.popupMessage}>
                Without an online account, your progress will be saved to this device only.
              </Text>
              <Text style={styles.popupMessage}>
                If the app is uninstalled or the device is reset, your data may be lost.
              </Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={styles.modalCloseButton}
                  onPress={() => setShowModal(false)}
                >
                  <Text style={styles.modalCloseText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
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
  title: {
    fontSize: 32,
    fontFamily: 'CrimsonText-Bold',
    fontWeight: '500',
    marginBottom: 24,
  },
  label: {
    fontSize: 22,
    fontFamily: 'Crimson Text',
    fontWeight: '600',
    marginTop: 16,
  },
  value: {
    fontSize: 20,
    fontFamily: 'Crimson Text',
    marginLeft: 10,
    marginTop: 4,
  },
  autoDeleteRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 14,
    marginBottom: 30,
  },
  autoDeleteButtonDisabled: {
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 18,
    fontSize: 16,
    fontFamily: 'Crimson Text',
    color: '#aaa',
    textAlign: 'center',
  },
  selected: {
    backgroundColor: '#ccc',
    color: '#000',
    fontWeight: '700',
  },
  editButton: {
    backgroundColor: '#10471B',
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  editButtonText: {
    fontFamily: 'Crimson Text',
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  divider: {
    height: 2,
    backgroundColor: '#000',
    marginVertical: 24,
  },
  convertTitle: {
    fontSize: 22,
    fontFamily: 'Crimson Text',
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
    fontFamily: 'Crimson Text',
    color: '#000',
  },
  link: {
    fontSize: 18,
    fontFamily: 'Crimson Text',
    color: '#0056B3',
    textAlign: 'center',
    marginVertical: 24,
    textDecorationLine: 'underline',
  },
  convertButton: {
    backgroundColor: '#FFD12D',
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  convertText: {
    fontSize: 20,
    fontFamily: 'Crimson Text',
    fontWeight: '700',
    color: '#000',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupBox: {
    width: 320,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 6,
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  closeButtonText: {
    fontSize: 22,
    fontWeight: '600',
  },
  popupTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Crimson Text',
    marginBottom: 10,
  },
  popupMessage: {
    fontSize: 16,
    fontFamily: 'Crimson Text',
    marginBottom: 8,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalCloseButton: {
    backgroundColor: '#0B3D0B',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 30,
    elevation: 3,
  },
  modalCloseText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Crimson Text',
  },
});
