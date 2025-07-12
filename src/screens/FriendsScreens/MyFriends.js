import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth, firestore } from '../../constants/firebaseConfig';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import RedNotif from '../../newcomps/RedNotif';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

export default function MyFriends() {
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [friends, setFriends] = useState([]);
  const [hasFriendRequests, setHasFriendRequests] = useState(false);
  const navigation = useNavigation();

  useFocusEffect(
  useCallback(() => {
    const fetchFriends = async () => {
      const user = auth.currentUser;
      if (!user) return;

      try {
        const snapshot = await getDocs(collection(firestore, 'Users', user.uid, 'Friends'));
        const fetchedFriends = await Promise.all(snapshot.docs.map(async docSnap => {
          const data = docSnap.data();
          const friendId = data.friendId;
          const friendRef = doc(firestore, 'Users', friendId);
          const friendDoc = await getDoc(friendRef);
          const friendData = friendDoc.exists() ? friendDoc.data() : {};

          return {
            name: data.penname || 'Friend',
            date: data.added?.seconds ? new Date(data.added.seconds * 1000).toLocaleDateString() : '',
            bio: friendData.bio || 'No bio submitted.',
          };
        }));

        setFriends(fetchedFriends);
      } catch (err) {
        console.error('Error fetching friends:', err);
      }
    };

    const checkFriendRequests = async () => {
      const user = auth.currentUser;
      if (!user) return;

      try {
        const snapshot = await getDocs(collection(firestore, 'Users', user.uid, 'FriendRequests'));
        setHasFriendRequests(!snapshot.empty);
      } catch (err) {
        console.error('Error checking friend requests:', err);
      }
    };

    fetchFriends();
    checkFriendRequests();
  }, [])
);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Friends</Text>
      <ScrollView contentContainerStyle={{ paddingBottom: 140 }}>
        {friends.map((friend, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setSelectedFriend(friend)}
            style={styles.card}
          >
            <View style={styles.cardHeader}>
              <Text style={styles.name}>{friend.name}</Text>
              <Text style={styles.date}>Friends Since: {friend.date}</Text>
            </View>
            <Text style={styles.preview} numberOfLines={3}>
              {friend.bio}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {selectedFriend && (
        <Modal
          transparent
          animationType="fade"
          visible={!!selectedFriend}
          onRequestClose={() => setSelectedFriend(null)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalBox}>
              <View style={styles.cardHeader}>
                <Text style={styles.name} numberOfLines={2}>{selectedFriend.name}</Text>
                <Text style={styles.date}>Friends Since: {selectedFriend.date}</Text>
              </View>
              <Text style={styles.fullDetails}>{selectedFriend.bio}</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setSelectedFriend(null)}
              >
                <Text style={styles.closeText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}

      <View style={styles.bottomButtons}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddFriends')}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.addText}>Add Friends</Text>
            {hasFriendRequests && <View style={{ marginLeft: 8 }}><RedNotif /></View>}
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate('EditFriends')}
        >
          <Text style={styles.editText}>Edit Friends</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}




const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    paddingTop: 24,
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 34,
    fontWeight: '500',
    fontFamily: 'CrimsonText-Bold',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginTop: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
    width: '97%',
    alignSelf: 'center',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  name: {
    fontSize: 20,
    fontWeight: '500',
    fontFamily: 'CrimsonText-Bold',
    flexShrink: 1, 
    flexBasis: '60%'
  },
  date: {
    fontSize: 16,
    fontFamily: 'CrimsonText-Italic',
  },
  preview: {
    fontSize: 16,
    fontFamily: 'CrimsonText-Regular',
    color: '#333',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: 340,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,
  },
  fullDetails: {
    fontSize: 16,
    fontFamily: 'CrimsonText-Regular',
    marginTop: 12,
    marginBottom: 20,
    color: '#111',
  },
  closeButton: {
    backgroundColor: '#FFD12D',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    alignSelf: 'flex-end',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  closeText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    fontFamily: 'CrimsonText-Bold',
  },
  bottomButtons: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addButton: {
    backgroundColor: '#10471B',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginBottom: 10,
  },
  addText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'CrimsonText-Bold',
    fontWeight: '600',
  },
  badge: {
    backgroundColor: '#D60000',
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: 8,
  },
  badgeText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  editButton: {
    backgroundColor: '#FFD12D',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 30,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginBottom: 10,
  },
  editText: {
    color: '#000',
    fontSize: 18,
    fontFamily: 'CrimsonText-Bold',
    fontWeight: '600',
  },
});
