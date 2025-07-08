import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import isEmail from 'validator/lib/isEmail';
import { useForm, Controller } from 'react-hook-form';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
} from 'react-native';
import { useUser } from '../contexts/UserContext';


//firebase imports
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, firestore } from '../constants/firebaseConfig.js'

export default function LoginScreen() {
    const { setUserType } = useUser(); // ⬅️ Add this

    const navigation = useNavigation();
    const [authError, setAuthError] = useState(null);

    //form stuff
    const { control, handleSubmit, formState: { errors }, clearErrors } = useForm({ mode: 'onSubmit', reValidateMode: 'onSubmit' });

    const onSubmit = async ({ email, password }) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setUserType('online');
            navigation.navigate('OnlineHomepage');
        } catch (error) {
            console.log('Login error code:', error.code); // Debug log
            if (
                error.code === 'auth/user-not-found' ||
                error.code === 'auth/wrong-password' ||
                error.code === 'auth/invalid-credential'
            ) {
                setAuthError('credentials');
            } else {
                console.log('Unhandled error:', error);
            }
        }
    };

    const handleReset = () => {
        navigation.navigate('ResetPassword');
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.welcome}>Welcome To</Text>
            <Text style={styles.title}>The Same Page</Text>

            <View style={styles.loginBox}>
                <Text style={styles.loginHeader}>Login</Text>

                <Controller
                    control={control}
                    name="email"
                    rules={{
                        required: 'Email is required',
                        validate: value => isEmail(value) || 'Please enter a valid email address'
                    }}
                    render={({ field: { onChange, value } }) => (
                        <>
                            {errors.email && (
                                <Text style={styles.warning}>{errors.email.message}</Text>
                            )}
                            {authError === 'credentials' && (
                                <Text style={[styles.warning, {color: 'red'}]}>Incorrect email or password</Text>
                            )}
                            <TextInput
                                value={value}
                                onChangeText={(text) => {
                                    onChange(text);
                                    if (authError) setAuthError(null);
                                }}
                                placeholder="Email"
                                placeholderTextColor="#CCC"
                                keyboardType="email-address"
                                style={[
                                    styles.input,
                                    (errors.email || authError === 'email') && styles.inputError
                                ]}
                            />
                        </>
                    )}
                />

                <Controller
                    control={control}
                    name="password"
                    rules={{ required: 'Password is required' }}
                    render={({ field: { onChange, value } }) => (
                        <>
                            {authError === 'password' && (
                                <Text style={styles.warning}>Incorrect password</Text>
                            )}
                            {errors.password && (
                                <Text style={styles.warning}>{errors.password.message}</Text>
                            )}
                            <TextInput
                                value={value}
                                onChangeText={(text) => {
                                    onChange(text);
                                    if (authError) setAuthError(null);
                                }}
                                secureTextEntry
                                placeholder="Password"
                                placeholderTextColor="#CCC"
                                style={[
                                    styles.input,
                                    (errors.password || authError === 'password') && styles.inputError
                                ]}
                            />
                        </>
                    )}
                />

                <TouchableOpacity onPress={handleReset}>
                    <Text style={styles.forgotPassword}>Forgot Password?</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.loginButton} onPress={handleSubmit(onSubmit)}>
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
        paddingBottom: 100,
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
    inputError: {
        borderColor: 'red',
        borderStyle: 'solid',
        borderWidth: 1
    },
    warning: {
        color: '#B00000',
        fontFamily: 'Crimson Text',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'left',
    },
});
