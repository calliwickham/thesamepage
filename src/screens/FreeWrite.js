import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Keyboard,
    TouchableWithoutFeedback,
    Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SaveIcon from '../newcomps/SaveIcon';
import UndoIcon from '../newcomps/Undo';

//firebase imports
import { doc, collection, addDoc, updateDoc } from 'firebase/firestore';
import { auth, firestore } from '../constants/firebaseConfig.js'

const getWordCount = (text) => {
    return text.trim().split(/\s+/).filter(Boolean).length;
};

export default function FreeWrite() {

    const navigation = useNavigation();
    const [title, setTitle] = useState('');
    const [story, setStory] = useState('');
    const [prevTitle, setPrevTitle] = useState('');
    const [prevStory, setPrevStory] = useState('');

    const [freeWriteId, setFreeWriteId] = useState(null);

    const onSaveOrPublish = async (buttonType,title, text) => {

        const published = buttonType == 'save' ? false : true;

        if (!title.trim() || !text.trim()) {
            alert('Please fill out both the title and the content before saving.');
            return;
        }

        const userId = auth.currentUser?.uid;
        if (!userId) {
            alert('User not authenticated.');
            return;
        }

        try {
            const userId = auth.currentUser?.uid;

            const wordCount = getWordCount(text);

            if (freeWriteId) {
                const docRef = doc(firestore, 'Users', userId, 'FreeWrites', freeWriteId);
                await updateDoc(docRef, {
                    title: title,
                    text: text,
                    wordcount: wordCount,
                    date: new Date(),
                    published: published,
                });
            } else {
                const freeWritesRef = collection(firestore, 'Users', userId, 'FreeWrites');
                const docRef = await addDoc(freeWritesRef, {
                    title: title,
                    text: text,
                    wordcount: wordCount,
                    date: new Date(),
                    published: published,
                });
                setFreeWriteId(docRef.id);
            }
            console.log('FreeWrite saved successfully!');
        } catch (error) {
            console.log('Error saving FreeWrite:', error);
        }

    };

    const handleTitleChange = (text) => {
        setPrevTitle(title);
        setTitle(text);
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
        setTitle(prevTitle);
        setStory(prevStory);
    };

    const handlePublish = () => {
        console.log('Publishing:', { title, story });
    };

    return (
        <TouchableWithoutFeedback styles={styles.view} onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <View style={styles.headerRow}>
                    <Text style={styles.header}>Free Write</Text>
                    <TouchableOpacity style={styles.inspireButton} onPress={() => navigation.navigate('FreeWriteInspireMe')}>
                        <Text style={styles.inspireText}>Inspire Me</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <TextInput
                        style={styles.titleInput}
                        placeholder="Title of Work"
                        value={title}
                        onChangeText={handleTitleChange}
                        placeholderTextColor="#aaa"
                    />
                </View>

                <View style={styles.scrollSection}>
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                        <TextInput
                            style={styles.storyInput}
                            placeholder="Write your story"
                            value={story}
                            onChangeText={handleStoryChange}
                            placeholderTextColor="#ccc"
                            multiline
                        />
                    </ScrollView>
                    <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
                        <Text style={styles.clearText}>clear</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.buttonRow}>
                    <TouchableOpacity onPress={() => onSaveOrPublish('save',title, story)}>
                        <SaveIcon />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.publishButton} onPress={()=> {
                        onSaveOrPublish('publish',title, story);
                        navigation.navigate('Albums');
                        Alert.alert('Published', 'You can find it in the Free Write album.');
                    }}>
                        <Text style={styles.publishText}>Publish</Text>
                    </TouchableOpacity>


                    <TouchableOpacity onPress={handleUndo}>
                        <UndoIcon width={41} height={38} />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}


const styles = StyleSheet.create({
    view: {
        flex: 1,
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        //justifyContent: 'space-between',
        backgroundColor: '#e8efe2',
        paddingHorizontal: 16,
        paddingTop: 20,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    header: {
        fontSize: 32,
        fontFamily: 'Crimson Text',
        fontWeight: 'bold',
    },
    inspireButton: {
        backgroundColor: '#0B3D0B',
        paddingVertical: 10,
        paddingHorizontal: 18,
        borderRadius: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    inspireText: {
        fontSize: 18,
        fontFamily: 'Crimson Text',
        color: '#fff',
        fontWeight: '700',
    },
    titleInput: {
        backgroundColor: '#fff',
        borderRadius: 12,
        fontSize: 20,
        fontFamily: 'Crimson Text',
        padding: 12,
        marginVertical: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    scrollSection: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 12,
        marginVertical: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    storyInput: {
        textAlignVertical: 'top',
        fontSize: 18,
        flex: 1,
        fontSize: 18,
        fontFamily: 'Crimson Text',
    },
    clearButton: {
        position: 'absolute',
        bottom: 10,
        right: 16,
        backgroundColor: '#fcdede',
        borderRadius: 12,
        paddingVertical: 4,
        paddingHorizontal: 12,
    },
    clearText: {
        color: 'red',
        fontFamily: 'Crimson Text',
        fontWeight: '600',
        fontSize: 16,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
    },
    saveIcon: {
        fontSize: 36,
    },
    undoIcon: {
        fontSize: 36,
    },
    publishButton: {
        backgroundColor: '#FFD12D',
        borderRadius: 30,
        paddingVertical: 10,
        paddingHorizontal: 36,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 4,
        marginBottom: 10,
    },
    publishText: {
        fontSize: 20,
        fontFamily: 'Crimson Text',
        fontWeight: '700',
        color: '#000',
    },
});
