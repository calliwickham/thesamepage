import React, { useState, useEffect } from 'react';
import {
    View, Text, TextInput, TouchableOpacity,
    ScrollView, StyleSheet
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
    collection, getDocs, query, where, doc, setDoc
} from 'firebase/firestore';
import { auth, firestore } from '../../constants/firebaseConfig';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';


export default function AddFriends() {
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState('');
    const [results, setResults] = useState([]);
    const [hasRequests, setHasRequests] = useState(false);
    const currentUser = auth.currentUser;

    useFocusEffect(
  useCallback(() => {
    const checkFriendRequests = async () => {
      try {
        const snapshot = await getDocs(
          collection(firestore, 'Users', currentUser.uid, 'FriendRequests')
        );
        setHasRequests(!snapshot.empty);
      } catch (err) {
        console.error('Friend request check error:', err);
      }
    };

    if (currentUser) {
      checkFriendRequests();
    }
  }, [currentUser])
);


    const handleSearch = async () => {

        const trimmedQuery = searchQuery.trim();
        if (trimmedQuery === "") return;

        try {
            const q = query(
                collection(firestore, 'Users'),
                where('penname', '>=', trimmedQuery),
                where('penname', '<=', trimmedQuery + '\uf8ff')
            );
            const snapshot = await getDocs(q);
            const foundUsers = [];
            snapshot.forEach(docSnap => {
                if (docSnap.id !== currentUser.uid) {
                    foundUsers.push({
                        id: docSnap.id,
                        name: docSnap.data().penname,
                        bio: docSnap.data().bio || 'No bio submitted.',
                    });
                }
            });
            setResults(foundUsers);
        } catch (err) {
            console.error('Search error:', err);
        }
    };

    const sendFriendRequest = async (targetId) => {
        try {
            const requestRef = doc(firestore, 'Users', targetId, 'FriendRequests', currentUser.uid);
            await setDoc(requestRef, {
                from: currentUser.uid,
                timestamp: new Date(),
            });
            alert('Friend request sent!');
        } catch (error) {
            console.error('Send request error:', error);
            alert('Could not send request.');
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.backArrow}>←</Text>
            </TouchableOpacity>
            <Text style={styles.header}>Add Friends</Text>

            <Text style={styles.subHeader}>Search For Friends</Text>

            <TextInput
                style={styles.input}
                placeholder="Type Username Here"
                placeholderTextColor="#ccc"
                value={searchQuery}
                onChangeText={setSearchQuery}
            />

            <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                <Text style={styles.searchText}>Search Users</Text>
            </TouchableOpacity>

            <Text style={styles.resultsTitle}>Search Results:</Text>

            <ScrollView style={styles.resultsContainer}>
                {results.map((friend, index) => (
                    <View key={index} style={styles.card}>
                        <View style={styles.row}>
                            <Text style={styles.name}>{friend.name}</Text>
                            <TouchableOpacity onPress={() => sendFriendRequest(friend.id)}>
                                <Text style={styles.plus}>＋</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.description}>{friend.bio}</Text>
                    </View>
                ))}

                {hasRequests && (
                    <View style={styles.notificationBox}>
                        <Text style={styles.noticeHeader}>You Have New Friend Requests!</Text>
                        <Text style={styles.noticeText}>
                            Click the Button below to see your requests:
                        </Text>
                        <TouchableOpacity
                            style={styles.viewButton}
                            onPress={() => navigation.navigate('FriendRequests')}
                        >
                            <Text style={styles.viewText}>View Requests</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    // ... all existing styles stay the same ...
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingTop: 24,
    },
    header: {
        fontSize: 32,
        fontWeight: '600',
        fontFamily: 'CrimsonText-Bold',
        marginBottom: 12,
    },
    subHeader: {
        fontSize: 18,
        fontFamily: 'CrimsonText-SemiBold',
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        paddingBottom: 4,
        marginBottom: 10,
    },
    input: {
        backgroundColor: '#F4F4F4',
        borderRadius: 10,
        padding: 12,
        fontSize: 16,
        fontFamily: 'CrimsonText-Regular',
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    searchButton: {
        backgroundColor: '#FFD12D',
        paddingVertical: 14,
        borderRadius: 30,
        alignItems: 'center',
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    searchText: {
        fontSize: 20,
        fontFamily: 'CrimsonText-Bold',
        fontWeight: '600',
    },
    resultsTitle: {
        fontSize: 18,
        fontFamily: 'CrimsonText-SemiBold',
        marginBottom: 10,
    },
    resultsContainer: {
        flex: 1,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
        width: '97%',
        alignSelf: 'center',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    name: {
        fontSize: 20,
        fontFamily: 'CrimsonText-Bold',
        fontWeight: '600',
    },
    plus: {
        fontSize: 26,
        fontWeight: '500',
        color: '#10471B',
    },
    description: {
        marginTop: 6,
        fontFamily: 'CrimsonText-Regular',
        fontSize: 16,
        color: '#333',
    },
    notificationBox: {
        backgroundColor: '#FFF6E8',
        padding: 16,
        borderRadius: 12,
        marginBottom: 80,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    noticeHeader: {
        fontSize: 20,
        fontWeight: '600',
        fontFamily: 'CrimsonText-Bold',
        marginBottom: 8,
    },
    noticeText: {
        fontSize: 16,
        fontFamily: 'CrimsonText-Regular',
        marginBottom: 10,
    },
    viewButton: {
        backgroundColor: '#10471B',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 30,
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 4,
    },
    viewText: {
        color: '#fff',
        fontSize: 18,
        fontFamily: 'CrimsonText-Bold',
        fontWeight: '600',
    },
    backArrow: {
        fontSize: 28,
        lineHeight: 20,
        marginRight: 12,
        color: '#000',
    },
});