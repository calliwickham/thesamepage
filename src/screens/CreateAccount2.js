import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Alert,
    Platform,
} from 'react-native';
import { useUser } from '../contexts/UserContext';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useForm, Controller } from 'react-hook-form';
import isEmail from 'validator/lib/isEmail';
import Button from '../newcomps/Button';
import NavArrow from '../newcomps/NavArrow';
import GuestModal from './GuestModal';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, firestore } from '../constants/firebaseConfig.js'
import { doc, setDoc } from 'firebase/firestore';

export default function CreateAccount2({ navigation }) {
    const { setUserType, userId } = useUser();
    const [showModal, setShowModal] = useState(false);
    const { control, handleSubmit, formState: { errors } } = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
    });

    const onSubmit = async (formData) => {
        const email = formData.email?.trim();
        const password = 'defaultpassword'; // Replace with proper password logic if needed

        if (!isEmail(email)) {
            Alert.alert('Invalid Email', 'Please enter a valid email address.');
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const newUser = userCredential.user;

            // Set Firestore document for online account
            await setDoc(doc(firestore, 'users', newUser.uid), {
                email: email,
                createdAt: new Date(),
                type: 'online',
            });

            // Optionally: migrate offline (guest) data to new user's collections here

            setUserType('online');
            Alert.alert('Success', 'Online account created!');
            navigation.navigate('OnlineHomepage');
        } catch (error) {
            console.error('Error creating online account:', error);
            Alert.alert('Error', error.message || 'Could not create online account.');
        }
    };

    return (
        <KeyboardAwareScrollView
            style={styles.wrapper}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <NavArrow style={{ marginVertical: 10 }} onPress={() => navigation.goBack()} />

            <View style={styles.container}>
                <Text style={styles.title}>Add Email</Text>
                <View style={styles.divider} />

                <Text style={styles.info}>
                    You need an email for an online account.
                </Text>

                <Controller
                    control={control}
                    name="email"
                    rules={{
                        required: true,
                        validate: value => isEmail(value) || 'Please enter a valid email address'
                    }}
                    render={({ field: { onChange, value } }) => (
                        <>
                            {errors.email && (
                                <Text style={styles.warning}>{errors.email.message}</Text>
                            )}
                            <TextInput
                                value={value}
                                onChangeText={onChange}
                                placeholder="Email Address"
                                placeholderTextColor="#CCC"
                                keyboardType="email-address"
                                style={[
                                    styles.input,
                                    errors.email && styles.inputError
                                ]}
                            />
                        </>
                    )}
                />

                <Button
                    style={styles.button}
                    textStyle={styles.buttonText}
                    onPress={handleSubmit(onSubmit)}
                >
                    Continue
                </Button>
            </View>

            <GuestModal
                visible={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={() => {
                    navigation.navigate('OfflineHomepage');
                    setShowModal(false);
                }}
                styles={styles}
            />
        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
        paddingTop: 0,
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
        paddingVertical: 10,
    },
    buttonText: {
        fontSize: 20,
    },
    warning: {
        color: '#B00000',
        fontFamily: 'Crimson Text',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'left',
        marginBottom: 6,
    },
});
