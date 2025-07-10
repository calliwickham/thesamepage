import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    Modal,
    Alert
} from 'react-native';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { generateThreeWords } from '../utils/wordPool';

//firebase imports
import { doc, collection, setDoc } from 'firebase/firestore';
import { auth, firestore } from '../constants/firebaseConfig.js'

const getWordCount = (text) => {
    return text.trim().split(/\s+/).filter(Boolean).length;
};


import SaveIcon from '../newcomps/SaveIcon';
import UndoIcon from '../newcomps/Undo';

export default function DailyChallengeScreen() {
    const navigation = useNavigation();

    const [pendingNavigation, setPendingNavigation] = useState(null);
    const [showExitModal, setShowExitModal] = useState(false);

    const route = useRoute();
    const file = route.params?.file;

    const [story, setStory] = useState('');
    const [prevStory, setPrevStory] = useState('');
    const [dailyId, setDailyId] = useState(null);
    const [challengeWords, setChallengeWords] = useState([]);

    useEffect(() => {
        if (file) {
            setStory(file.text || '');
            setPrevStory(file.text || '');
            setDailyId(file.id || null);

            if (Array.isArray(file.words) && file.words.length === 3) {
                setChallengeWords(file.words);
            } else {
                setChallengeWords(generateThreeWords());
            }
        } else {
            setChallengeWords(generateThreeWords());
        }
    }, [file]);
    useEffect(() => {
        if (!file && challengeWords.length === 3) {
            onSaveOrPublish('save', story);
        }
    }, [challengeWords]);

    const onSaveOrPublish = async (buttonType, text) => {

        const published = buttonType == 'save' ? false : true;

        const userId = auth.currentUser?.uid;
        if (!userId) {
            alert('User not authenticated.');
            return;
        }

        try {
            const userId = auth.currentUser?.uid;
            const todayId = new Date().toISOString().split('T')[0]; // ISO format
            const wordCount = getWordCount(text);

            const docRef = doc(firestore, 'Users', userId, 'DailyChallenges', todayId);

            const data = {
                words: challengeWords,
                text,
                wordcount: wordCount,
                date: new Date(),
                published,
            };

            if (published && Array.isArray(challengeWords) && challengeWords.length === 3) {
                data.title = `${challengeWords[0]}, ${challengeWords[1]}, ${challengeWords[2]}`;
            }

            await setDoc(docRef, data);
            console.log('Daily Challenge saved successfully!');
        } catch (error) {
            console.log('Error saving Daily Challenge:', error);
        }

    };

    const handleStoryChange = (text) => {
        setPrevStory(story);
        setStory(text);
    };

    const handleClear = () => {
        setPrevStory(story);
        setStory('');
    };

    const handleUndo = () => {
        setStory(prevStory);
    };

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={styles.container}
            enableOnAndroid={true}
            extraScrollHeight={20}
            keyboardShouldPersistTaps="handled"
        >
            <Text style={styles.header}>
                Write a short story inspired by{'\n'}these three words...
            </Text>

            <View style={styles.wordButton}>
                <Text style={styles.wordText}>{challengeWords[0]}</Text>
            </View>
            <View style={styles.wordButton}>
                <Text style={styles.wordText}>{challengeWords[1]}</Text>
            </View>
            <View style={styles.wordButton}>
                <Text style={styles.wordText}>{challengeWords[2]}</Text>
            </View>

            <View style={styles.textBoxWrapper}>
                <TextInput
                    style={styles.textBox}
                    placeholder="Write your story"
                    placeholderTextColor="#ccc"
                    multiline
                    value={story}
                    onChangeText={handleStoryChange}
                />
                <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
                    <Text style={styles.clearText}>clear</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.buttonRow}>
                <TouchableOpacity onPress={() => onSaveOrPublish('save', story)}>
                    <SaveIcon width={50} height={50} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.submitButton} onPress={() => {
                    onSaveOrPublish('publish', story);
                    navigation.navigate('Albums');
                    Alert.alert('Published', 'You can find it in the Daily Challenge album.');
                }}>
                    <Text style={styles.submitText}>Submit</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleUndo} style={{marginRight: 10}}>
                    <UndoIcon width={41} height={38} />
                </TouchableOpacity>
            </View>

            {/* Exit Warning Modal */}
            {showExitModal && (
                <Modal
                    transparent
                    animationType="fade"
                    visible={showExitModal}
                    onRequestClose={() => setShowExitModal(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.popupBox}>
                            <Text style={styles.popupTitle}>Save before exiting?</Text>
                            <Text style={styles.popupMessage}>
                                You still have until the end of the day to complete your challenge.
                            </Text>
                            <View style={styles.modalButtons}>
                                <TouchableOpacity
                                    style={styles.exitButton}
                                    onPress={() => {
                                        navigation.goBack();
                                        setShowExitModal(false);
                                    }}
                                >
                                    <Text style={styles.exitText}>Exit without saving</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.saveButton}
                                    onPress={() => {
                                        onSaveOrPublish('save', story);
                                        setShowExitModal(false);
                                        navigation.goBack();
                                    }}
                                >
                                    <Text style={styles.saveText}>Yes, Save</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            )}
        </KeyboardAwareScrollView>

    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#E8EFE2',
        flex: 1,
        paddingTop: 20,
        paddingBottom: 10,
        paddingHorizontal: 24,
    },
    header: {
        fontSize: 22,
        textAlign: 'center',
        fontFamily: 'CrimsonText-Bold',
        fontWeight: '600',
        marginBottom: 20,
    },
    wordButton: {
        backgroundColor: '#10471B',
        paddingVertical: 12,
        borderRadius: 4,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    wordText: {
        color: '#FFF4E2',
        fontSize: 20,
        fontFamily: 'CrimsonText-SemiBold',
        fontWeight: '600',
        textAlign: 'center',
    },
    textBoxWrapper: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 10,
        marginTop: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
        position: 'relative',
        flex: 1,
    },
    textBox: {
        fontSize: 18,
        fontFamily: 'CrimsonText-Regular',
        height: 200,
        textAlignVertical: 'top',
    },
    clearButton: {
        position: 'absolute',
        bottom: 8,
        right: 10,
        backgroundColor: '#FFD6D6',
        paddingHorizontal: 16,
        paddingBottom: 8,
        paddingTop: 4,
        borderRadius: 24,
    },
    clearText: {
        color: '#D33',
        fontWeight: '600',
        fontFamily: 'CrimsonText-SemiBold',
        fontSize: 16,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 24,
        paddingHorizontal: 8,
    },
    submitButton: {
        backgroundColor: '#FFD12D',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 30,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        marginBottom: 10,
    },
    submitText: {
        fontSize: 20,
        fontFamily: 'CrimsonText-SemiBold',
        fontWeight: '600',
        color: '#000',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    popupBox: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 24,
        width: 320,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    popupTitle: {
        fontFamily: 'CrimsonText-Bold',
        fontSize: 22,
        fontWeight: '500',
        textAlign: 'center',
        marginBottom: 10,
    },
    popupMessage: {
        fontFamily: 'CrimsonText-Regular',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 24,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    exitButton: {
        backgroundColor: '#F02828',
        paddingVertical: 12,
        paddingHorizontal: 18,
        borderRadius: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 4,
    },
    exitText: {
        fontFamily: 'CrimsonText-SemiBold',
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
    },
    saveButton: {
        backgroundColor: '#FFD12D',
        paddingVertical: 12,
        paddingHorizontal: 22,
        borderRadius: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 4,
    },
    saveText: {
        fontFamily: 'CrimsonText-SemiBold',
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
    },
});
