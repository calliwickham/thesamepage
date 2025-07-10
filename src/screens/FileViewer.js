import React, { useState } from 'react';
import {
    SafeAreaView, ScrollView, StyleSheet, View, Text,
    TouchableOpacity, Modal, Alert
} from 'react-native';
import { useRoute, useNavigation } from "@react-navigation/native";
import Bookmark from '../newcomps/Bookmark';
import EmptyBookmark from '../newcomps/EmptyBookmark';
import InfoIcon from '../newcomps/InfoIcon';

import { getDocs, collection, doc, updateDoc } from 'firebase/firestore';
import { auth, firestore } from '../constants/firebaseConfig.js'
import { ALBUMSTHEMES } from '../constants/AlbumsThemes.js';

export default function FileViewer() {
    const navigation = useNavigation();
    const route = useRoute();
    const { file } = route.params;
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [showPopup, setShowPopup] = useState(false);

    const albumThemes = ALBUMSTHEMES;

    const deleteFile = async () => {
        const userId = auth.currentUser?.uid;
        if (!userId) {
            alert('User not authenticated.');
            return;
        }

        const collectionName = albumThemes[file.album].firestoreName;
        if (!collectionName) {
            console.error('Unknown album type:', file.album);
            return;
        }

        
        //console.log('got docRef');
        try {
            const docRef = doc(firestore, 'Users', userId, collectionName, file.id);
            await updateDoc(docRef, {
                deleted: true,
                deletedOn: new Date(), 
            });
            //console.log('File' + file.id + 'marked as deleted.');
            alert('File Deleted');
            navigation.goBack();
            // Optionally navigate back or show a toast
        } catch (error) {
            console.error('Error deleting file:', error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topBar}>
                <View style={styles.rightIcons}>
                    <TouchableOpacity onPress={() => setIsBookmarked(prev => !prev)}>
                        {isBookmarked ? <Bookmark /> : <EmptyBookmark />}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setShowPopup(true)}>
                        <InfoIcon />
                    </TouchableOpacity>
                </View>
            </View>

            <Text style={styles.header}>{file.title}</Text>
            <View style={styles.divider} />

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.text}>{file.text}</Text>
            </ScrollView>

            {/* Return to Albums Button */}
            <TouchableOpacity
                style={styles.returnButton}
                onPress={() => navigation.navigate('Albums')}
            >
                <Text style={styles.returnButtonText}>Return to Albums</Text>
            </TouchableOpacity>

            <Modal transparent visible={showPopup} animationType="fade">
                <View style={styles.modalOverlay}>
                    {/* Touchable background to dismiss modal */}
                    <TouchableOpacity
                        style={StyleSheet.absoluteFill}
                        activeOpacity={1}
                        onPress={() => setShowPopup(false)}
                    />

                    {/* Modal content */}
                    <View style={styles.popupMenu}>
                        <View style={styles.popupSection}>
                            <Text style={styles.popupTitle}>About File</Text>
                            <Text style={styles.popupSub}>
                                Created <Text style={styles.italic}>8/12/2023</Text>
                            </Text>
                            <Text style={styles.popupSub}>140 words</Text>
                        </View>

                        <View style={styles.popupDivider} />

                        <Text style={styles.popupItem}>Add to Favorites</Text>
                        <Text style={styles.popupItem}>Edit</Text>

                        {/* Only this is touchable */}
                        <TouchableOpacity onPress={() => deleteFile()}>
                            <Text style={styles.popupItem}>Delete Story</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 6,
    marginHorizontal: 12,
  },
  rightIcons: {
    flexDirection: 'row',
    gap: 16,
  },
  header: {
    fontSize: 32,
    fontFamily: 'CrimsonText-Bold',
    textAlign: 'center',
    fontWeight: '500',
    marginTop: 12,
    marginBottom: 8,
    paddingHorizontal: 20,
  },
  divider: {
    height: 1,
    backgroundColor: 'black',
    width: '100%',
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 100,
  },
  text: {
    fontSize: 18,
    fontFamily: 'CrimsonText-Regular',
    lineHeight: 28,
  },
  returnButton: {
    backgroundColor: '#10471B',
    paddingVertical: 14,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 28,
    alignItems: 'center',
  },
  returnButtonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'CrimsonText-Bold',
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 80,
    paddingRight: 16,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  popupMenu: {
    width: 260,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 8,
  },
  popupSection: {
    marginBottom: 10,
  },
  popupTitle: {
    fontWeight: '500',
    fontSize: 18,
    fontFamily: 'CrimsonText-SemiBold',
    marginBottom: 4,
  },
  popupSub: {
    fontSize: 15,
    fontFamily: 'CrimsonText-Regular',
  },
  italic: {
    fontFamily: 'CrimsonText-Italic',
  },
  popupDivider: {
    height: 1,
    backgroundColor: '#aaa',
    marginVertical: 10,
  },
  popupItem: {
    fontSize: 16,
    fontFamily: 'CrimsonText-Regular',
    paddingVertical: 6,
  },
});
