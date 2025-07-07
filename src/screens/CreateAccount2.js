import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Alert,
    Platform,
} from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Button from '../newcomps/Button';
import NavArrow from '../newcomps/NavArrow';
import GuestModal from './GuestModal.js';

export default function CreateAccount2({ navigation }) {
    const [email, setEmail] = useState('');
    const [showModal, setShowModal] = useState(false);

    const handleSubmit = () => {
        Alert.alert('Account successfully created');
        navigation.navigate('OnlineHomepage');
    };

    return (
        <KeyboardAwareScrollView
            style={styles.wrapper}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <NavArrow style={{ marginVertical: 10 }} onPress={() => navigation.goBack()}> </NavArrow>
            
            <View style={styles.container}>
                <Text style={styles.title}>Add Email</Text>
                <View style={styles.divider} />

                <Text style={styles.info}>
                    You need an email for an online account.
                </Text>

                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="example@mail.com"
                    placeholderTextColor="#CCC"
                    keyboardType="email-address"
                />

                <Button style={styles.button} textStyle={styles.buttonText} onPress={handleSubmit}>Continue</Button>
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
        borderColor: 'red',
        borderWidth: 1,
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
    label: {
        fontSize: 18,
        fontFamily: 'Crimson Text',
        marginBottom: 8,
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
    note: {
        textAlign: 'center',
        fontSize: 16,
        fontFamily: 'Crimson Text',
        fontWeight: '600',
        color: '#F00',
        marginBottom: 20,
    },
    localAccountText: {
        marginTop: 15,
        color: '#0056A3',
        fontSize: 16,
        textAlign: 'center',
        fontFamily: 'CrimsonText-Regular',
        textDecorationLine: 'underline',
    },
});
