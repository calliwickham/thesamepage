import { useState } from 'react';
import { View, Text, StyleSheet, Pressable, TouchableOpacity, Modal } from 'react-native';
import Button from '../../newcomps/Button';
import { useNavigation } from '@react-navigation/native';

export default function GuestModal({ visible, onClose, onConfirm }) {

    //const [showModal, setShowModal] = useState(false);
    const navigation = useNavigation();

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <Pressable style={styles.modalOverlay} onPress={onClose}>
                <View style={styles.popupBox}>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={onClose}
                    >
                        <Text style={styles.closeButtonText}>✕</Text>
                    </TouchableOpacity>
                    <Text style={styles.popupTitle}>Are you sure?</Text>
                    <Text style={styles.popupMessage}>
                        Without an online account, your progress will be saved to this device only.
                        {'\n\n'}
                        If the app is uninstalled or the device is reset, your data may be lost.
                    </Text>
                    <View style={styles.modalButtons}>
                        <Button textStyle={[styles.modalConfirmText]} onPress={onConfirm}>
                            Use Offline Account
                        </Button>
                    </View>
                    <Text style={styles.popupFooter}>(You may change this later)</Text>
                </View>
            </Pressable>
        </Modal>);

}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    popupBox: {
        width: '95%',
        marginTop: 150,
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
        position: 'absolute',
        top: 5,
        right: 5,
    },
    closeButtonText: {
        padding: 10,
        fontSize: 22,
        fontWeight: '600',
    },
    popupTitle: {
        fontSize: 26,
        fontWeight: '500',
        fontFamily: 'CrimsonText-Bold',
        marginBottom: 16,
    },
    popupMessage: {
        fontSize: 16,
        fontFamily: 'CrimsonText-Regular',
        marginVertical: 12,
    },
    modalButtons: {
        alignSelf: 'center',
        width: '80%',
        marginTop: 20,
    },
    modalConfirmText: {
        color: '#000',
        fontSize: 18,
        fontWeight: '600',
        fontFamily: 'CrimsonText-Bold',
    },
    popupFooter: {
        fontSize: 14,
        fontFamily: 'CrimsonText-Regular',
        textAlign: 'center',
        marginTop: 12,
        color: '#555',
    },
});