import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Modal,
  Linking,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import CheckBoxIcon from '../newcomps/CheckBoxIcon';

export default function EditOfflineSettingsPage() {
  const navigation = useNavigation();
  const [selectedDeleteOption, setSelectedDeleteOption] = useState('1 Year');
  const [isChecked, setIsChecked] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showConvertModal, setShowConvertModal] = useState(false);

  const handleConvert = () => {
    if (!isChecked) {
      setShowConvertModal(true);
    } else {
      navigation.navigate('CreateAccount2');
    }
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const handleRedirect = () => {
    navigation.navigate('Login');
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <View style={styles.container}>
        <Text style={styles.header}>Your Account</Text>

        <Text style={styles.label}>Username</Text>
        <TextInput style={[styles.input, styles.disabledInput]} value="supercoolwriter69" editable={false} />

        <Text style={styles.label}>Date Joined</Text>
        <TextInput style={[styles.input, styles.disabledInput]} value="06/21/2025" editable={false} />

        <Text style={styles.label}>Daily Challenge Auto-Delete</Text>
        <View style={styles.autoDeleteRow}>
          {['30 Days', '1 Year', 'None'].map(option => (
            <TouchableOpacity
              key={option}
              style={[styles.autoDeleteButton, selectedDeleteOption === option && styles.activeButton]}
              onPress={() => setSelectedDeleteOption(option)}
            >
              <Text style={[styles.autoDeleteText, selectedDeleteOption === option && styles.activeText]}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={() => navigation.goBack()}>
          <Text style={styles.saveText}>Save Your Changes</Text>
        </TouchableOpacity>

        <View style={{ height: 1, backgroundColor: '#000', marginVertical: 24 }} />

        <Text style={styles.label}>Convert to an Online Account?</Text>
        <View style={{ flexDirection: 'row', gap: 12, marginBottom: 24 }}>
          <Pressable onPress={() => setIsChecked(!isChecked)}>
            {isChecked ? <CheckBoxIcon /> : <View style={styles.uncheckedBox} />}
          </Pressable>
          <Text style={{ flex: 1, fontSize: 16, fontFamily: 'Crimson Text' }}>
            By checking this box, you acknowledge that your account will be online, allowing you to collaborate, connect,
            and communicate with other users. You also agree to follow our{' '}
            <Text style={styles.link} onPress={() => Linking.openURL('https://example.com/community-guidelines')}>
              Community Guidelines
            </Text>{' '}
            and to interact respectfully, avoiding any behavior that could make others feel uncomfortable.
          </Text>
        </View>

        <TouchableOpacity style={styles.resetButton} onPress={handleConvert}>
          <Text style={styles.resetText}>Convert</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.deleteText}>Delete My Account</Text>
        </TouchableOpacity>

        {showConvertModal && (
          <Modal
            animationType="fade"
            transparent={true}
            visible={showConvertModal}
            onRequestClose={() => setShowConvertModal(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.popupBox}>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setShowConvertModal(false)}
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
                    onPress={() => setShowConvertModal(false)}
                  >
                    <Text style={styles.modalCloseText}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        )}

        {showDeleteModal && (
          <Modal
            animationType="fade"
            transparent={true}
            visible={showDeleteModal}
            onRequestClose={() => setShowDeleteModal(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.popupBox}>
                <Text style={styles.popupTitle}>Are You Sure?</Text>
                <Text style={styles.popupMessage}>
                  Proceeding with account deletion will{' '}
                  <Text style={{ fontStyle: 'italic' }}>permanently</Text> delete your account.
                </Text>
                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    style={styles.modalCloseButton}
                    onPress={() => setShowDeleteModal(false)}
                  >
                    <Text style={styles.modalCloseText}>Go Back</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.modalConfirmButton}
                    onPress={() => {
                        setShowDeleteModal(false);
                        handleRedirect();
                    }}
                    >
                    <Text style={styles.modalConfirmText}>Delete</Text>
                    </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, backgroundColor: '#fff', flex: 1 },
  header: { fontSize: 32, fontFamily: 'Crimson Text', fontWeight: 'bold', marginBottom: 20 },
  label: { fontSize: 22,
    fontFamily: 'Crimson Text',
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 10,},
  input: {
    backgroundColor: '#fff', fontFamily: 'Crimson Text', fontSize: 18,
    borderRadius: 12, padding: 12, marginBottom: 20,
    elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2, shadowRadius: 3,
  },
  disabledInput: { backgroundColor: '#f0f0f0', color: '#999' },
  autoDeleteRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 20 },
  autoDeleteButton: {
    paddingHorizontal: 18, paddingVertical: 10, borderRadius: 20,
    borderColor: '#000', borderWidth: 1, backgroundColor: '#fff', elevation: 2,
  },
  autoDeleteText: { fontFamily: 'Crimson Text', fontSize: 16, fontWeight: '600', color: '#aaa' },
  activeButton: { backgroundColor: '#ccc' },
  activeText: { color: '#000' },
  saveButton: {
    backgroundColor: '#10471B', paddingVertical: 16, borderRadius: 40,
    alignItems: 'center', marginTop: 10, elevation: 5,
  },
  saveText: { color: '#FFF4E2', fontSize: 20, fontFamily: 'Crimson Text', fontWeight: '700' },
  resetButton: {
    backgroundColor: '#FFD12D', paddingVertical: 14, borderRadius: 30,
    alignItems: 'center', marginTop: 12, elevation: 5,
  },
  resetText: { fontSize: 18, fontFamily: 'Crimson Text', fontWeight: '700', color: '#000' },
  deleteButton: {
    backgroundColor: '#D60000', paddingVertical: 16, borderRadius: 40,
    alignItems: 'center', marginTop: 20, elevation: 5,
  },
  deleteText: { fontSize: 20, fontFamily: 'Crimson Text', fontWeight: '700', color: '#000' },
  link: { color: '#007AFF', textDecorationLine: 'underline' },
  uncheckedBox: {
    width: 22, height: 22, borderWidth: 2, borderColor: '#000',
    borderRadius: 4, marginTop: 3,
  },
  modalOverlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center',
  },
  popupBox: {
    width: 320, backgroundColor: 'white', borderRadius: 10, padding: 20,
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25, shadowRadius: 4, elevation: 6,
  },
  closeButton: { alignSelf: 'flex-end' },
  closeButtonText: { fontSize: 22, fontWeight: '600' },
  popupTitle: {
    fontSize: 20, fontWeight: 'bold', fontFamily: 'Crimson Text', marginBottom: 10,
  },
  popupMessage: {
    fontSize: 16, fontFamily: 'Crimson Text', marginBottom: 8,
  },
  modalButtons: {
    flexDirection: 'row', justifyContent: 'flex-end', marginTop: 20,
  },
  modalCloseButton: {
    backgroundColor: '#0B3D0B', paddingVertical: 10, paddingHorizontal: 24,
    borderRadius: 30, elevation: 3,
  },
  modalCloseText: {
    color: '#fff', fontSize: 18, fontWeight: '600', fontFamily: 'Crimson Text',
  },
  modalConfirmButton: {
    backgroundColor: '#D60000', paddingVertical: 12, paddingHorizontal: 24,
    borderRadius: 40, elevation: 3, marginLeft: 12,
  },
  modalConfirmText: {
    color: '#000', fontSize: 18, fontWeight: '700', fontFamily: 'Crimson Text',
  },
});
