import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, TouchableOpacity, Linking, ScrollView, Modal } from 'react-native';
import CheckBoxIcon from '../newcomps/CheckBoxIcon';
import { useNavigation } from '@react-navigation/native';

export default function CreateOnline1() {
  const [isChecked, setIsChecked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigation = useNavigation();

  const handleCreateAccount = () => {
    if (!isChecked) {
      setShowModal(true);
    } else {
      navigation.navigate('CreateAccount2');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Create An Account</Text>
        <View style={styles.divider} />

        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#CCC"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          placeholderTextColor="#CCC"
        />

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

        <Text style={styles.warning}>
          If you do not consent to an online account, DO NOT check the above box
        </Text>

        <TouchableOpacity style={styles.button} onPress={handleCreateAccount}>
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>
      </View>

      {/* Modal Popup */}
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
              <TouchableOpacity
                style={styles.modalConfirmButton}
                onPress={() => {
                  setShowModal(false);
                  navigation.navigate('LocalAccount1');
                }}
              >
                <Text style={styles.modalConfirmText}>Make Offline Account</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.popupFooter}>(You may change this later)</Text>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 40,
  },
  container: {
    margin: 20,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    fontFamily: 'Crimson Text',
    marginBottom: 8,
  },
  divider: {
    height: 2,
    backgroundColor: '#000',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    fontSize: 24,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
    fontFamily: 'CrimsonText-Regular',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
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
    color: '#0056B3',
    textDecorationLine: 'underline',
  },
  warning: {
    color: '#B00000',
    fontFamily: 'Crimson Text',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
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

  // Popup styles
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  modalCloseText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Crimson Text',
  },
  modalConfirmButton: {
    backgroundColor: '#FFD12D',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  modalConfirmText: {
    color: '#000',
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Crimson Text',
  },
  popupFooter: {
    fontSize: 14,
    fontFamily: 'Crimson Text',
    textAlign: 'center',
    marginTop: 12,
    color: '#555',
  },
});
