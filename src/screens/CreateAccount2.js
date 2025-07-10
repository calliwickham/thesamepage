import React, { useState } from 'react';
import {
    View, Text, StyleSheet, TextInput, Alert, Platform
} from 'react-native';
import { useUser } from '../contexts/UserContext';
import { auth, firestore } from '../constants/firebaseConfig';
import { EmailAuthProvider, linkWithCredential } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useForm, Controller } from 'react-hook-form';
import isEmail from 'validator/lib/isEmail';

import Button from '../newcomps/Button';
import NavArrow from '../newcomps/NavArrow';
import GuestModal from './GuestModal';

export default function CreateAccount2({ navigation }) {
    const { setUserType } = useUser();
    const [showModal, setShowModal] = useState(false);

    const { control, handleSubmit, formState: { errors }, clearErrors } = useForm({ mode: 'onSubmit', reValidateMode: 'onSubmit' });

    const onSubmit = async (form) => {
        //const password = 'default-password'; // TODO: Replace with user-defined password later

        try {
            const user = auth.currentUser;

            if (user && user.isAnonymous) {
                const credential = EmailAuthProvider.credential(form.email, form.password);
                const linkedUser = await linkWithCredential(user, credential);

                // Update Firestore with email & mark as not guest
                const userDocRef = doc(firestore, 'Users', linkedUser.user.uid);
                await updateDoc(userDocRef, {
                    email: form.email,
                    isGuest: false,
                    emailVerified: false,
                });

                setUserType('online');
                Alert.alert('Success', 'Your account has been upgraded to an online account.');
                navigation.navigate('OnlineHomepage');
            } else {
                Alert.alert('Error', 'No anonymous session found to upgrade.');
            }
        } catch (error) {
            console.error("Error upgrading account:", error);
            Alert.alert('Error', error.message);
        }
    };

    return (
        <KeyboardAwareScrollView style={styles.wrapper}>
            <NavArrow onPress={() => navigation.goBack()} />

            <View style={styles.container}>
                <Text style={styles.title}>Add Email</Text>
                <View style={styles.divider} />
                <Text style={styles.info}>You need an email for an online account.</Text>

                <Controller
                    control={control}
                    name="email"
                    rules={{
                        required: true,
                        validate: (value) => isEmail(value) || 'Enter a valid email address',
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
                                style={[styles.input, errors.email && styles.inputError]}
                            />
                        </>
                    )}
                />

                <Controller
                    control={control}
                    name="password"
                    rules={{
                        required: true,
                        minLength: {
                            value: 8,
                            message: 'Password must be at least 8 characters',
                        },
                    }}
                    render={({ field: { onChange, value } }) => (
                        <>
                            {errors.password && (
                                <Text style={styles.warning}>{errors.password.message}</Text>
                            )}
                            <TextInput
                                value={value}
                                onChangeText={(text) => {
                                    onChange(text);
                                    //if (errors.password) clearErrors('password');
                                }}
                                secureTextEntry
                                placeholder="Password"
                                placeholderTextColor="#CCC"
                                style={[
                                    styles.input,
                                    errors.password && styles.inputError
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
        fontWeight: '500',
        fontFamily: 'CrimsonText-Bold',
        marginBottom: 10,
    },
    divider: {
        height: 2,
        backgroundColor: '#000',
        marginBottom: 20,
    },
    info: {
        fontSize: 22,
        fontFamily: 'CrimsonText-Regular',
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
        fontFamily: 'CrimsonText-Regular',
    },
    button: {
        paddingVertical: 10,
    },
    buttonText: {
        fontSize: 20,
    },
    warning: {
        color: '#B00000',
        fontFamily: 'CrimsonText-SemiBold',
        fontSize: 16,
        fontWeight: '600',
    },
});
