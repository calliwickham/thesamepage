import { useState, useEffect } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

import FileCard from '../newcomps/FileCard.js';
import SearchBox from '../newcomps/SearchBox.js';
import { ALBUMSTHEMES } from '../constants/AlbumsThemes.js';

//firestore imports
import { getDocs, collection } from 'firebase/firestore';
import { auth, firestore } from '../constants/firebaseConfig.js'

export default function GenericAlbum() {
    const route = useRoute();
    const navigation = useNavigation();
    const { albumKey } = route.params;
    const albumThemes = ALBUMSTHEMES;


    const [files, setFiles] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {

                if (albumKey === 'trash' || albumKey === 'favorites') {
                    setFiles([]); // temporary fallback until real logic is implemented
                    return;
                }

                const userId = auth.currentUser?.uid;
                const collectionName = albumThemes[albumKey].firestoreName;
                const userCollectionRef = collection(firestore, 'Users', userId, collectionName);
                const snapshot = await getDocs(userCollectionRef);
                const docs = snapshot.docs.map(doc => {
                    const data = doc.data();
                    const entry = {
                        id: doc.id,
                        album: albumKey,
                        title: data.title || '[Untitled]',
                        date: data.date?.toDate?.().toLocaleDateString() || '',
                        text: data.text,
                        wordcount: data.wordcount,
                    };
                    if ('published' in data) {
                        entry.published = data.published;
                    }
                    return entry;
                });
                setFiles(docs);
            } catch (error) {
                console.error("Error fetching files in album: ", error);
                setFiles([]);
            }
        };

        fetchData();
    }, []);

    console.log('Rendering for albumKey:', albumKey, 'with theme:', albumThemes[albumKey]);

    if (files === null) return <View style={styles.loadingView}><Text style={styles.loadingText}>Loading...</Text></View>;

    if (albumKey !== 'freewrite' && albumKey !== 'daily') {
        return (
            <View style={styles.loadingView}>
                <View style={[styles.messageBox, {backgroundColor: albumThemes[albumKey].color}]}>
                    <Text style={styles.wipTitle}>This Feature is Coming Soon!</Text>
                    <Text style={styles.wipSubtitle}>
                        We're still working on {albumThemes[albumKey].name}.{'\n'}Please check back in a future update.
                    </Text>
                </View>
            </View>
        );
    }
    else return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>{albumThemes[albumKey].shortName} Files</Text>
            <SearchBox placeholder="Search for." style={styles.search} />
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {files.map((file, i) => (
                    <TouchableOpacity
                        key={i}
                        onPress={() => navigation.navigate('FileViewer', { file })}
                        activeOpacity={0.7}
                    >
                        <FileCard file={file} />
                    </TouchableOpacity>
                ))}
                {files.length === 0 ? <View style={[styles.messageBox, {backgroundColor: albumThemes[albumKey].color}]}>
                    <Text style={styles.wipTitle}>There's nothing here!</Text>
                    <Text style={styles.wipSubtitle}>
                        Head back to home and choose {albumThemes[albumKey].name} mode to start writing!
                    </Text>
                </View> : null}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        fontSize: 32,
        fontFamily: 'CrimsonText-BoldItalic',
        textAlign: 'center',
        marginTop: 16,
        marginBottom: 2,
        fontWeight: 'bold',
    },
    search: {
        marginHorizontal: '5%',
        marginVertical: 12,
    },
    scrollContainer: {
        paddingBottom: 6,
        paddingLeft: '5%',
        paddingRight: '5%',
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
        fontFamily: 'Crimson Text'
    },
    messageBox: {
        padding: 24,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
        marginBottom: 20,
    },
    wipTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        fontFamily: 'Crimson Text',
        marginBottom: 8,
        textAlign: 'center',
    },
    wipSubtitle: {
        fontSize: 16,
        fontFamily: 'Crimson Text',
        textAlign: 'center',
        color: '#555',
    },
});
