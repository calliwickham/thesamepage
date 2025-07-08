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
        };

        fetchData();
    }, []);

    if (!files) return <View style={styles.loadingView}><Text style={styles.loadingText}>Loading...</Text></View>;

    return (
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
    }
});
