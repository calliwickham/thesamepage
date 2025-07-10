import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Alert,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth, firestore } from '../constants/firebaseConfig';
import {
  collection,
  getDocs,
  deleteDoc,
  doc
} from 'firebase/firestore';

export default function EditFriends() {
  const navigation = useNavigation();
  const [friends, setFriends] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const fetchFriends = async () => {
      const user = auth.currentUser;
      if (!user) return;

      try {
        const snapshot = await getDocs(collection(firestore, 'Users', user.uid, 'Friends'));
        const loaded = snapshot.docs.map((docSnap) => {
          const data = docSnap.data();
          return {
            id: docSnap.id,
            name: data.penname || 'Friend',
            bio: data.bio || 'No bio submitted.',
          };
        });
        setFriends(loaded);
      } catch (error) {
        console.error('Error fetching friends:', error);
      }
    };

    fetchFriends();
  }, []);

  const handleDeletePress = (friend) => {
    setSelectedFriend(friend);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      const user = auth.currentUser;
      if (!user || !selectedFriend) return;

      // Remove from current user
      await deleteDoc(doc(firestore, 'Users', user.uid, 'Friends', selectedFriend.id));

      // Also remove from other user
      await deleteDoc(doc(firestore, 'Users', selectedFriend.id, 'Friends', user.uid));

      setFriends((prev) => prev.filter((f) => f.id !== selectedFriend.id));
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Delete friend error:', error);
      Alert.alert('Error', 'Failed to remove friend.');
    }
  };

  const handleSave = () => {
    Alert.alert('Success', 'Changes saved.');
    navigation.navigate('MyFriends');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Edit My Friends</Text>
      <ScrollView style={{ flex: 1 }}>
        {friends.map((friend) => (
          <View key={friend.id} style={styles.card}>
            <View style={styles.cardRow}>
              <Text style={styles.name}>{friend.name}</Text>
              <TouchableOpacity onPress={() => handleDeletePress(friend)}>
                <Text style={styles.deleteX}>✕</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.description}>{friend.bio}</Text>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveText}>Save Changes</Text>
      </TouchableOpacity>

      {showDeleteModal && selectedFriend && (
        <Modal transparent animationType="fade" visible={showDeleteModal}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalBox}>
              <Text style={styles.modalTitle}>Are You Sure?</Text>
              <Text style={styles.modalText}>
                Proceeding with friend removal will <Text style={{ fontStyle: 'italic' }}>permanently</Text> remove {selectedFriend.name} from your account.
              </Text>
              <Text style={styles.modalText}>
                You’ll need to add them again if you want to re-friend them.
              </Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={styles.goBackButton}
                  onPress={() => setShowDeleteModal(false)}
                >
                  <Text style={styles.goBackText}>Go Back</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteButton} onPress={confirmDelete}>
                  <Text style={styles.deleteText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
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
    fontSize: 32,
    fontFamily: 'Crimson Text',
    fontWeight: '600',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 20,
    fontFamily: 'Crimson Text',
    fontWeight: '600',
  },
  deleteX: {
    fontSize: 26,
    color: 'red',
    fontWeight: 'bold',
  },
  description: {
    fontFamily: 'Crimson Text',
    fontSize: 16,
    marginTop: 4,
    color: '#333',
  },
  saveButton: {
    backgroundColor: '#FFD12D',
    paddingVertical: 14,
    borderRadius: 30,
    marginTop: 12,
    marginBottom: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    alignItems: 'center',
  },
  saveText: {
    fontSize: 20,
    fontFamily: 'Crimson Text',
    fontWeight: '600',
    color: '#000',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
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
  modalTitle: {
    fontFamily: 'Crimson Text',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  modalText: {
    fontFamily: 'Crimson Text',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 12,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  goBackButton: {
    backgroundColor: '#FFD12D',
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 30,
    elevation: 3,
  },
  goBackText: {
    fontFamily: 'Crimson Text',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  deleteButton: {
    backgroundColor: '#F02828',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    elevation: 3,
  },
  deleteText: {
    fontFamily: 'Crimson Text',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});
