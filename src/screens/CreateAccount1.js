import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, TouchableOpacity, Linking, ScrollView, Modal } from 'react-native';

import GuestModal from './GuestModal.js';
import CheckBoxIcon from '../newcomps/CheckBoxIcon';
import Button from '../newcomps/Button';
import NavArrow from '../newcomps/NavArrow';
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
            <NavArrow style={{ marginVertical: 8 }} onPress={() => navigation.goBack()}> </NavArrow>
            <View style={[styles.container, { marginVertical: 0 }]}>
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
                        <View style={{}}>
                            <View style={!isChecked ? styles.checkBox : [styles.checkBox, styles.checkBoxFill]} />
                            {isChecked ? <View style={{ position: 'absolute' }}><CheckBoxIcon /></View> : null}
                        </View>
                    </Pressable>
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

                <Button textStyle={styles.buttonText} onPress={handleCreateAccount}>Sign Up</Button>

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
                onConfirm={() => {
                    navigation.navigate('OfflineHomepage');
                    setShowModal(false);
                }}
                styles={styles}
            />
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
        textAlign: 'center',
        marginBottom: 20,
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
});
