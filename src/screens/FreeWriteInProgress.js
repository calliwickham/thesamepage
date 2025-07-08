import {useState, useEffect} from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import InProgressIcon from '../newcomps/InProgressIcon';
import { ALBUMSTHEMES } from '../constants/AlbumsThemes.js';

export default function FreeWriteScreen1() {
    const navigation = useNavigation();

    const albumKey = 'freewrite';
    const albumThemes = ALBUMSTHEMES;
    const [files, setFiles] = useState(null); useEffect(() => {
        const fetchData = async () => {
            const userId = auth.currentUser?.uid;
            const collectionName = albumThemes[albumKey].firestoreName;
            const userCollectionRef = collection(firestore, 'Users', userId, collectionName);
            const snapshot = await getDocs(userCollectionRef);
            const docs = snapshot.docs.map(doc => {
                const data = doc.data();
                return entry = {
                    album: albumKey,
                    title: data.title || '[Untitled]',
                    date: data.date?.toDate?.().toLocaleDateString() || '',
                    text: data.text,
                    wordcount: data.wordcount,
                    published: data.published,
                };
            })
            .filter(entry => entry.published === false)
            setFiles(docs);
        };

        fetchData();
    }, []);

    const freeWrites = [
        {
            title: "A very long title, notice that this person didn’t finish their work.",
            date: "06/23/2025",
            description:
                "The user started a free write, hit save, but never hit publish. Unfinished works always show at the top of the gallery, even if old.",
        },
        {
            title: "fast as a bullet",
            date: "05/16/2025",
            description:
                "Incredible top speed, after only 20 seconds, he catches up and overtakes the front.",
        },
        {
            title: "Deja Vu",
            date: "1/17/2025",
            description:
                "I just been in this time before...",
        },
    ];

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scroll}>
                <Text style={styles.header}>Your Open Free Writes</Text>

                {freeWrites.map((item, index) => (
                    <View key={index} style={styles.card}>
                        <View style={styles.cardCorner}>
                            {/* Replace below with <ClockIcon /> or actual image if needed */}
                            <InProgressIcon />
                        </View>
                        <Text style={styles.cardTitle}>{item.title}</Text>
                        <View style={styles.divider} />
                        <Text style={styles.cardDate}>Date Created: <Text style={styles.italic}>{item.date}</Text></Text>
                        <Text style={styles.cardDesc}>{item.description}</Text>
                    </View>
                ))}

                <TouchableOpacity
                    style={styles.newButton}
                    onPress={() => navigation.navigate('FreeWriteScreen2')}
                >
                    <Text style={styles.newButtonText}>Start New Free Write</Text>
                </TouchableOpacity>
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
        fontFamily: 'Crimson Text',
        fontWeight: 'bold',
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
        fontFamily: 'Crimson Text',
        fontWeight: '600',
        marginBottom: 10,
    },
    divider: {
        height: 1,
        backgroundColor: '#000',
        marginBottom: 8,
    },
    cardDate: {
        fontSize: 16,
        fontFamily: 'Crimson Text',
        marginBottom: 6,
    },
    italic: {
        fontStyle: 'italic',
    },
    cardDesc: {
        fontSize: 16,
        fontFamily: 'Crimson Text',
    },
    newButton: {
        backgroundColor: '#FFD12D',
        alignSelf: 'center',
        paddingVertical: 16,
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
        fontFamily: 'Crimson Text',
        fontWeight: '700',
        color: '#000',
    },
});
