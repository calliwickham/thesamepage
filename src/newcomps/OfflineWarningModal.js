import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import GreenX from '../newcomps/GreenX'; // your SVG 'X' icon

export default function OfflineWarningModal({ visible, onClose }) {
  const navigation = useNavigation();

  const handleConfirm = () => {
    onClose();
    navigation.navigate('LocalAccount1');
  };

  return (
    <Modal transparent animationType="fade" visible={visible} onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <GreenX width={18} height={20} />
          </TouchableOpacity>

          <Text style={styles.title}>Are you sure?</Text>

          <Text style={styles.text}>
            Without an online account, your progress will be saved to this device only.
          </Text>
          <Text style={styles.text}>
            If the app is uninstalled or the device is reset, your data may be lost.
          </Text>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.closeBox} onPress={onClose}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.confirmBox} onPress={handleConfirm}>
              <Text style={styles.confirmText}>Make Offline Account</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.footerNote}>(You may change this later)</Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: 350,
    height: 324,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: 'relative',
    justifyContent: 'space-between',
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  title: {
    fontFamily: 'Crimson Text',
    fontWeight: 'bold',
    fontSize: 36,
    marginTop: 10,
  },
  text: {
    fontFamily: 'Crimson Text',
    fontSize: 16,
    marginTop: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  closeBox: {
    backgroundColor: '#10471B',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  closeText: {
    color: 'white',
    fontFamily: 'Crimson Text',
    fontWeight: 'bold',
    fontSize: 16,
  },
  confirmBox: {
    backgroundColor: '#FFD12D',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  confirmText: {
    fontFamily: 'Crimson Text',
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
  },
  footerNote: {
    fontSize: 14,
    fontFamily: 'Crimson Text',
    color: '#555',
    alignSelf: 'center',
    marginTop: 10,
  },
});
