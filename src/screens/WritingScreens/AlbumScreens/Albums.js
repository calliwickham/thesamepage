import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { collection, getDocs } from 'firebase/firestore';
import { auth, firestore } from '../../../constants/firebaseConfig.js';
import Button from '../../../newcomps/Button.js';
import { ALBUMSTHEMES } from '../../../constants/AlbumsThemes.js';

const albumsThemes = ALBUMSTHEMES;
const cardHeight = Dimensions.get('window').height / 6.5;

export default function Albums() {
    const navigation = useNavigation();
    const [albumData, setAlbumData] = useState({
        daily: { files: ' - - ', edited: ' - - ' },
        freewrite: { files: ' - - ', edited: ' - - ' },
        collaborative: { files: ' - - ', edited: null },
        favorites: { files: ' - - ', edited: null },
        trash: { files: ' - - ', edited: null },
    });

    useEffect(() => {
        const fetchAlbums = async () => {
            const user = auth.currentUser;
            if (!user) return;

            const loadCollection = async (collectionName) => {
                const ref = collection(firestore, 'Users', user.uid, collectionName);
                const snapshot = await getDocs(ref);

                const docs = snapshot.docs
                    .map(doc => doc.data())
                    .filter(doc => {
                        const isDeleted = doc.deleted === true;
                        const isUnpublishedDaily =
                            collectionName === 'DailyChallenges' && doc.published !== true;
                        return !isDeleted && !isUnpublishedDaily;
                    });

                const files = docs.length;

                const editedTimestamps = docs
                    .map(doc => {
                        const raw = doc.date;
                        return raw?.toDate?.();
                    })
                    .filter(Boolean);

                const latest = editedTimestamps.length
                    ? new Date(Math.max(...editedTimestamps.map(d => d.getTime())))
                    : null;

                return {
                    files: files > 0 ? files.toString() : ' - - ',
                    edited: latest ? latest.toLocaleDateString() : ' - - ',
                };
            };


            const [daily, freewrite] = await Promise.all([
                loadCollection('DailyChallenges'),
                loadCollection('FreeWrites'),
            ]);

            setAlbumData(prev => ({
                ...prev,
                daily,
                freewrite,
            }));
        };

        fetchAlbums();
    }, []);

    const albumOrder = ["daily", "freewrite", "collaborative", "favorites", "trash"];

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>My Albums</Text>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {albumOrder.map((key, index) => (
                    <View
                        key={index}
                        style={[
                            styles.card,
                            { backgroundColor: albumsThemes[key].color },
                            { borderColor: albumsThemes[key].border },
                        ]}
                    >
                        <View style={styles.upperSection}>
                            <Text style={styles.albumTitle}>
                                {albumsThemes[key].name}
                                {key === 'favorites' || key === 'trash' ? "" : " Album"}
                            </Text>
                        </View>

                        <View style={styles.divider} />

                        <View style={styles.lowerSection}>
                            <View style={styles.leftTextContainer}>
                                <Text style={styles.descriptionText}>
                                    {albumData[key].edited ? `Last Edited: ${albumData[key].edited}\n` : ""}
                                    Number of Files: {albumData[key].files}
                                </Text>
                            </View>
                            <View style={styles.rightPlaceholder}>
                                <Button style={{ marginLeft: 10 }} onPress={() => navigation.navigate('GenericAlbum', { albumKey: key })}>
                                    View Files
                                </Button>
                            </View>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  header: {
    fontSize: 32,
    fontFamily: 'CrimsonText-Bold',
    marginVertical: 16,
    fontWeight: '500',
    paddingLeft: '5%',
    marginBottom: 10,
  },
  scrollContainer: {
    paddingBottom: 0,
    paddingLeft: '5%',
    paddingRight: '5%',
  },
  card: {
    width: '100%',
    height: cardHeight,
    borderRadius: 16,
    marginBottom: 20,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 12,
    paddingRight: 12,
    borderStyle: 'solid',
    borderWidth: 1,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  upperSection: { flex: 0.4, justifyContent: 'center' },
  albumTitle: {
    fontSize: 24,
    //fontStyle: 'italic',
    fontFamily: 'CrimsonText-Italic',
  },
  divider: {
    height: 1,
    backgroundColor: 'black',
    marginVertical: 4,
  },
  lowerSection: {
    flex: 0.6,
    flexDirection: 'row',
    marginTop: 4,
  },
  leftTextContainer: { flex: 1, justifyContent: 'center' },
  descriptionText: {
    fontSize: 16,
    fontFamily: 'CrimsonText-Regular',
  },
  rightPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
