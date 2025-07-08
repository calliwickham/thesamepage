import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, TouchableOpacity, Linking, ScrollView, Modal } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import isEmail from 'validator/lib/isEmail';

import GuestModal from './GuestModal.js';
import CheckBoxIcon from '../newcomps/CheckBoxIcon';
import Button from '../newcomps/Button';
import NavArrow from '../newcomps/NavArrow';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../contexts/UserContext';



//firebase imports
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, firestore } from '../constants/firebaseConfig.js'
import { doc, setDoc } from "firebase/firestore";
import { storeLocal } from '../constants/storeLocal.js'
import uuid from 'react-native-uuid';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { storeLocal, getLocal, removeLocal } from '../utils/localStorage';



export default function CreateOnline1() {
    const { setUserType } = useUser();
    const [showModal, setShowModal] = useState(false);
    const navigation = useNavigation();

    //what happens when you submit the form
    const onSubmit = (form) => {
        //console.log('Form data:', form);
        createUserWithEmailAndPassword(auth, form.email, form.password)
            .then(async (userCredential) => {
                // Signed up 
                const user = userCredential.user.uid;
                await setDoc(doc(firestore, "Users", user), {
                    penname: form.username,
                    email: form.email,
                    joined: new Date(),
                    emailVerified: false,
                });
                alert(form.username + " logged in.")
                await storeLocal("penname", form.username);
                navigation.navigate('OnlineHomepage');
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage);
                // ..
            });
    };

    //form stuff
    const { control, handleSubmit, formState: { errors }, clearErrors } = useForm({ mode: 'onSubmit', reValidateMode: 'onSubmit' });

    return (
        <KeyboardAwareScrollView contentContainerStyle={styles.scrollContainer}>
            <NavArrow style={{ marginVertical: 8 }} onPress={() => navigation.goBack()}> </NavArrow>
            <View style={[styles.container, { marginVertical: 0 }]}>
                <Text style={styles.title}>Create An Account</Text>
                <View style={styles.divider} />

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
                                onChangeText={(text) => {
                                    onChange(text);
                                    //if (errors.email) clearErrors('email');
                                }}
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

                <Controller
                    control={control}
                    name="username"
                    rules={{ required: true }}
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            value={value}
                            onChangeText={(text) => {
                                onChange(text);
                                if (errors.username) clearErrors('username');
                            }}
                            placeholder="Penname"
                            placeholderTextColor="#CCC"
                            style={[
                                styles.input,
                                errors.username && styles.inputError
                            ]}
                        />
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

                <View style={styles.checkboxContainer}>
                    <Controller
                        control={control}
                        name="isChecked"
                        rules={{ validate: value => value || 'Required' }}
                        render={({ field: { value, onChange } }) => (
                            <Pressable
                                onPress={() => {
                                    const newValue = !value;
                                    onChange(newValue); // updates RHF form value
                                    if (errors.isChecked && newValue) clearErrors('isChecked');
                                }}
                            >
                                <View>
                                    <View
                                        style={[
                                            styles.checkBox,
                                            value && styles.checkBoxFill,
                                            errors.isChecked && [styles.inputError, { borderWidth: 2 }]
                                        ]}
                                    />
                                    {value && (
                                        <View style={{ position: 'absolute' }}>
                                            <CheckBoxIcon />
                                        </View>
                                    )}
                                </View>
                            </Pressable>
                        )}
                    />
                    <Text style={styles.checkboxText}>
                        By checking this box, you acknowledge that your account will be online, allowing you to collaborate, connect, and communicate with other users. You also agree to follow our{' '}
                        <Text
                            style={[styles.link, { fontFamily: 'Crimson Text', fontWeight: '500' }]}
                            onPress={() => Linking.openURL('https://example.com/community-guidelines')}
                        >
                            Community Guidelines
                        </Text>{' '}
                        and to interact respectfully, avoiding any behavior that could make others feel uncomfortable.
                    </Text>
                </View>

                <Text style={[styles.warning, { display: 'none' }]}>
                    If you do not consent to an online account, DO NOT check the above box
                </Text>

                <Button textStyle={styles.buttonText} onPress={() => {
                        setUserType('online');
                        handleSubmit(onSubmit)();
                    }}>
                    Sign Up
                </Button>

                <TouchableOpacity onPress={() => setShowModal(true)}>
                    <Text style={[styles.linkText]}>
                        Continue without Email
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Modal Popup */}
            <GuestModal
                visible={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={async () => {
                    const id = uuid.v4(); // generate a random user ID
                    const guestPenname = 'Guest_' + id.toString().slice(0, 6);

                    try {
                        // Sign in the guest user anonymously
                        const result = await signInAnonymously(auth);
                        const user = result.user;
                        const id = user.uid;

                        // Create Firestore user record
                        await setDoc(doc(firestore, "Users", id), {
                            penname: guestPenname,
                            joined: new Date(),
                            email: null,
                            emailVerified: false,
                            isGuest: true,
                        });

                        // Store locally if needed
                        await storeLocal("penname", guestPenname);
                        await storeLocal("userID", id);

                        setUserType('offline');
                        navigation.navigate('OfflineHomepage');
                        setShowModal(false);

                        } catch (error) {
                        console.error("Error creating guest user:", error);
                        alert("Failed to create guest account. Try again.");
                        }
                }}

                styles={styles}
            />
        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        paddingBottom: 40,
    },
    container: {
        margin: 20,
        padding: 20,
        paddingBottom: 15,
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
        padding: 12,
        fontSize: 20,
        marginBottom: 18,
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
    checkBox: {
        width: 24,
        height: 24,
        borderWidth: 2,
        borderColor: '#000',
        borderRadius: 4,
        marginRight: 10,
        marginTop: 4,
    },
    checkBoxFill: {
        backgroundColor: '#e6e6e6',
        borderColor: 'grey'
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
        textAlign: 'left',
    },
    buttonText: {
        fontSize: 22,
        fontWeight: '700',
        fontFamily: 'Crimson Text',
    },
    linkText: {
        marginTop: 12,
        color: '#0056A3',
        fontSize: 16,
        textAlign: 'center',
        fontFamily: 'CrimsonText-Regular',
        textDecorationLine: 'underline',
    },
    inputError: {
        borderColor: 'red',
        borderStyle: 'solid',
        borderWidth: 1
    }
});
