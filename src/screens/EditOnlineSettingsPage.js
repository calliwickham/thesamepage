import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth, firestore } from '../constants/firebaseConfig';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { EmailAuthProvider, reauthenticateWithCredential, deleteUser } from 'firebase/auth';
import { storeLocal } from '../constants/storeLocal.js'

import Button from '../newcomps/Button';

export default function EditOnlineSettingsPage() {
    const navigation = useNavigation();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [bio, setBio] = useState('');
    const [selectedDeleteOption, setSelectedDeleteOption] = useState('1 Year');
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        const fetchUserInfo = async () => {
            const user = auth.currentUser;
            if (!user) return;

            try {
                const userDoc = await getDoc(doc(firestore, 'Users', user.uid));
                if (userDoc.exists()) {
                    const data = userDoc.data();
                    setUsername(data.penname || '');
                    setEmail(data.email || '');
                    setBio(data.bio || '');
                    setSelectedDeleteOption(data.autoDelete || '1 Year');
                }
            } catch (err) {
                console.error('Error fetching user info:', err);
            }
        };

        fetchUserInfo();
    }, []);

    const handleSave = async () => {
        try {
            const user = auth.currentUser;
            if (!user) return;

            const userRef = doc(firestore, 'Users', user.uid);
            await updateDoc(userRef, {
                penname: username,
                email: email,
                bio: bio,
                autoDelete: selectedDeleteOption,
            });

            await storeLocal("penname", username);

            navigation.navigate('OnlineSettingsPage');
        } catch (err) {
            console.error('Error saving changes:', err);
        }
    };

    const [password, setPassword] = useState('');


    const handleDelete = async (password) => {
        const user = auth.currentUser;
        if (!user) return;

        try {
            const credential = EmailAuthProvider.credential(user.email, password);
            await reauthenticateWithCredential(user, credential);

            await deleteDoc(doc(firestore, 'Users', user.uid));
            await deleteUser(user);

            navigation.replace('Login');
        } catch (err) {
            Alert.alert('Delete Error', err.message);
        }
    };

    return (
        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.container}>
            <Text style={styles.header}>Your Account</Text>

            <Text style={styles.label}>Username</Text>
            <TextInput style={styles.input} value={username} onChangeText={setUsername} />

            <Text style={styles.label}>Email</Text>
            <TextInput style={styles.input} value={email} onChangeText={setEmail} />

            <TouchableOpacity
                style={styles.resetButton}
                onPress={() => navigation.navigate('ResetPassword')}
            >
                <Text style={styles.resetText}>Reset Password</Text>
            </TouchableOpacity>

            <Text style={styles.label}>Bio</Text>
            <TextInput
                style={[styles.input, styles.bioInput]}
                value={bio}
                onChangeText={setBio}
                multiline
            />

            <Text style={styles.label}>Daily Challenge Auto-Delete</Text>
            <View style={styles.autoDeleteRow}>
                {['30 Days', '1 Year', 'None'].map(option => (
                    <TouchableOpacity
                        key={option}
                        style={[
                            styles.autoDeleteButton,
                            selectedDeleteOption === option && styles.activeButton,
                        ]}
                        onPress={() => setSelectedDeleteOption(option)}
                    >
                        <Text
                            style={[
                                styles.autoDeleteText,
                                selectedDeleteOption === option && styles.activeText,
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

            <TouchableOpacity style={styles.deleteButton} onPress={() => setShowDeleteModal(true)}>
                <Text style={styles.deleteText}>Delete My Account</Text>
            </TouchableOpacity>

            {showDeleteModal && (
                <View style={styles.modalOverlay}>
                    <View style={styles.modalBox}>
                        <Text style={styles.modalTitle}>Are You Sure?</Text>
                        <Text style={styles.modalMessage}>
                            This will permanently delete your account.
                        </Text>
                        <Text style={styles.modalMessage}>
                            If so, please enter your password to authenticate deletion:
                        </Text>
                        <TextInput
                            style={[styles.input, { width: '90%' }]}
                            placeholder="Enter your password"
                            placeholderTextColor="#aaa"
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                        />
                        <View style={styles.modalButtons}>
                            <Button color="red"
                                style={styles.deleteConfirmButton}
                                textStyle={styles.deleteText}
                                onPress={() => {handleDelete(password)}}
                            >
                                Confirm Delete
                            </Button>
                            <Button color="yellow"
                                style={styles.goBackButton}
                                textStyle={styles.goBackText}
                                onPress={() => setShowDeleteModal(false)}
                            >
                                Go Back
                            </Button>
                        </View>
                    </View>
                </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
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
    bioInput: {
        height: 100,
        textAlignVertical: 'top',
    },
    resetButton: {
        backgroundColor: '#FFD12D',
        paddingVertical: 14,
        borderRadius: 30,
        alignItems: 'center',
        marginBottom: 30,
        elevation: 5,
    },
    resetText: {
        fontSize: 18,
        fontFamily: 'CrimsonText-Bold',
        fontWeight: '600',
        color: '#000',
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
    activeButton: {
        backgroundColor: '#ccc',
    },
    activeText: {
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
        fontSize: 18,
        fontFamily: 'CrimsonText-Bold',
        fontWeight: '600',
    },
    modalOverlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999, // high value
        elevation: 10, // for Android
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
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
    },
    goBackButton: {
        backgroundColor: '#FFD12D',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 40,
        marginRight: 12,
        elevation: 3,
        width: "60%",
        marginVertical: 30,
        marginTop: 40
    },
    goBackText: {
        fontSize: 22,
        fontFamily: 'CrimsonText-Bold',
        fontWeight: '500',
        color: '#000',
        textAlign: 'center',
    },
    deleteConfirmButton: {
        backgroundColor: '#D60000',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 40,
        elevation: 3,
        textAlign: 'center',
    },
});
