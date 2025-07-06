import React from 'react';
import { useNavigation } from '@react-navigation/native';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
} from 'react-native';

export default function LoginScreen() {
    const navigation = useNavigation();
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.welcome}>Welcome To</Text>
            <Text style={styles.title}>The Same Page</Text>

            <View style={styles.loginBox}>
                <Text style={styles.loginHeader}>Login</Text>

                <TextInput
                    placeholder="Username or Email"
                    placeholderTextColor="#CCC"
                    style={styles.input}
                />

                <TextInput
                    placeholder="Password"
                    placeholderTextColor="#CCC"
                    secureTextEntry
                    style={styles.input}
                />

                <TouchableOpacity>
                    <Text style={styles.forgotPassword}>Forgot Password?</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('OnlineHomepage')}>
                    <Text style={styles.loginButtonText}>Login</Text>
                </TouchableOpacity>

                <View style={styles.separator} />

                <TouchableOpacity style={styles.createButton} onPress={() => navigation.navigate('CreateAccount1')}>
                    <Text style={styles.createButtonText}>Create An Account</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.tagline}>
                Where Every Word{'\n'}Builds A World
            </Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 80,
        alignItems: 'center',
    },
    welcome: {
        fontSize: 36,
        fontWeight: '700',
        fontFamily: 'CrimsonText-Bold',
        marginBottom: 8,
    },
    title: {
        fontSize: 52,
        fontFamily: 'Italianno',
        marginBottom: 32,
    },
    loginBox: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 12,
        //borderColor: 'red',
        //borderWidth: 1,
        //borderStyle: 'solid',
        padding: 20,
        paddingBottom: 10,
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
        marginBottom: 32,
    },
    loginHeader: {
        fontSize: 32,
        fontWeight: '700',
        fontFamily: 'CrimsonText-Bold',
        marginBottom: 12,
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 8,
        borderColor: '#E0E0E0',
        borderWidth: 1,
        paddingVertical: 8,
        paddingHorizontal: 12,
        fontSize: 24,
        marginBottom: 16,
        fontFamily: 'CrimsonText-Regular',
        elevation: 2,
    },
    forgotPassword: {
        color: '#0056A3',
        fontSize: 16,
        marginBottom: 16,
        fontFamily: 'CrimsonText-Regular',
        textDecorationLine: 'underline',
    },
    loginButton: {
        backgroundColor: '#0B3B0B',
        borderRadius: 28,
        paddingVertical: 12,
        alignItems: 'center',
        marginBottom: 12,
        elevation: 3,
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '600',
        fontFamily: 'CrimsonText-SemiBold',
    },
    separator: {
        height: 1,
        backgroundColor: '#333',
        marginVertical: 12,
    },
    createButton: {
        backgroundColor: '#FFD429',
        borderRadius: 28,
        paddingVertical: 12,
        alignItems: 'center',
        marginBottom: 16,
        elevation: 3,
    },
    createButtonText: {
        color: '#000',
        fontSize: 20,
        fontWeight: '600',
        fontFamily: 'CrimsonText-SemiBold',
    },
    tagline: {
        fontSize: 52,
        textAlign: 'center',
        fontFamily: 'Italianno',
        color: '#444',
        marginTop: 24,
    },
});
