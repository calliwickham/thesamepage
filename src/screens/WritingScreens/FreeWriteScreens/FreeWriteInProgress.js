import { useState, useEffect } from 'react';
import { Animated } from 'react-native';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import FileCard from '../../../newcomps/FileCard.js';
import InProgressIcon from '../../../newcomps/InProgressIcon';
import { ALBUMSTHEMES } from '../../../constants/AlbumsThemes.js';

//firestore imports
import { getDocs, collection } from 'firebase/firestore';
import { auth, firestore } from '../../../constants/firebaseConfig.js'

export default function FreeWriteScreen1() {
    const navigation = useNavigation();

    const albumKey = 'freewrite';
    const albumThemes = ALBUMSTHEMES;
    const [hasFetched, setHasFetched] = useState(false);
    const [files, setFiles] = useState([]); useEffect(() => {
        const fetchData = async () => {
            const userId = auth.currentUser?.uid;
            const collectionName = albumThemes[albumKey].firestoreName;
            const userCollectionRef = collection(firestore, 'Users', userId, collectionName);
            const snapshot = await getDocs(userCollectionRef);
            const docs = snapshot.docs
                .map(doc => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        album: albumKey,
                        title: data.title || '[Untitled]',
                        date: data.date?.toDate?.().toLocaleDateString() || '',
                        text: data.text,
                        wordcount: data.wordcount,
                        published: data.published,
                    };
                })
                .filter(entry => entry.published === false);
            setFiles(docs);
            setHasFetched(true);
        };

        fetchData();
    }, []);

    //navigate straight to freewriting if there's no existing files
    useEffect(() => {
        if (hasFetched && files.length === 0) {
            navigation.navigate('FreeWriteScreen2'); // or whichever screen makes sense
        }
    }, [hasFetched, files]);
    if (!hasFetched) return <View style={styles.loadingView}><Text style={styles.loadingText}>Loading...</Text></View>;
    if (files.length === 0) {
        return null; // prevent flicker before redirect
    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scroll}>
                <Text style={styles.header}>Your Open Free Writes</Text>

                {files.map((file, i) => (
                    <TouchableOpacity
                        key={i}
                        onPress={() => navigation.navigate('FileViewer', { file })}
                        activeOpacity={0.7}
                    >
                        <FileCard file={file} />
                    </TouchableOpacity>
                ))}

                <TouchableOpacity
                    style={styles.newButton}
                    onPress={() => navigation.navigate('FreeWriteScreen2')}
                >
                    <Text style={styles.newButtonText}>Start New Free Write</Text>
                </TouchableOpacity>
                <ScrollView contentContainerStyle={styles.scrollContainer}>

                </ScrollView>
            </ScrollView>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scroll: {
        padding: 24,
        paddingBottom: 120,
    },
    header: {
        fontSize: 28,
        fontFamily: 'CrimsonText-Bold',
        fontWeight: '500',
        textAlign: 'center',
        marginBottom: 24,
    },
    card: {
        backgroundColor: '#FEF1D7',
        borderRadius: 14,
        padding: 16,
        paddingRight: 20,
        marginBottom: 24,
        position: 'relative',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 5,
        elevation: 3,
    },
    cardCorner: {
        position: 'absolute',
        top: -10,
        right: -10,
        width: 40,
        height: 40,
        zIndex: 2,
    },
    clockIcon: {
        width: 36,
        height: 36,
        resizeMode: 'contain',
    },
    cardTitle: {
        fontSize: 18,
        fontFamily: 'CrimsonText-SemiBold',
        fontWeight: '500',
        marginBottom: 10,
    },
    divider: {
        height: 1,
        backgroundColor: '#000',
        marginBottom: 8,
    },
    cardDate: {
        fontSize: 16,
        fontFamily: 'CrimsonText-Italic',
        marginBottom: 6,
    },
    italic: {
        fontStyle: 'italic',
    },
    cardDesc: {
        fontSize: 16,
        fontFamily: 'CrimsonText-Regular',
    },
    newButton: {
        backgroundColor: '#FFD12D',
        alignSelf: 'center',
        marginVertical: 16,
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 30,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.25,
        shadowRadius: 5,
    },
    newButtonText: {
        fontSize: 20,
        fontFamily: 'CrimsonText-Bold',
        fontWeight: '600',
        color: '#000',
    },
    loadingView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    loadingText: {
        color: 'darkgreen',
        fontSize: 20,
        fontFamily: 'CrimsonText-SemiBold'
    },
});
