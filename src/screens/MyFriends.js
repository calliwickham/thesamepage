import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RedNotif from '../newcomps/RedNotif';

export default function MyFriends() {
  const [selectedFriend, setSelectedFriend] = useState(null);
  const navigation = useNavigation();

  const friends = [
    {
      name: 'Anastasia',
      date: '06/22/2025',
      details: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis...',
    },
    {
      name: 'Connor',
      date: '12/30/2025',
      details: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis...',
    },
    {
      name: 'Fiona',
      date: '08/13/2013',
      details: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis...',
    },
    {
      name: 'Jonathan',
      date: '07/26/2024',
      details: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor.',
    },
  ];

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
              {friend.details}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Modal */}
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
                <Text style={styles.name}>{selectedFriend.name}</Text>
                <Text style={styles.date}>Friends Since: {selectedFriend.date}</Text>
              </View>
              <Text style={styles.fullDetails}>{selectedFriend.details}</Text>
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

      {/* Bottom Buttons */}
      <View style={styles.bottomButtons}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddFriends')}
        >
          <Text style={styles.addText}>Add Friends</Text>
          <RedNotif/>
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
    fontWeight: 'bold',
    fontFamily: 'Crimson Text',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Crimson Text',
  },
  date: {
    fontSize: 16,
    fontStyle: 'italic',
    fontFamily: 'Crimson Text',
  },
  preview: {
    fontSize: 16,
    fontFamily: 'Crimson Text',
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
    fontFamily: 'Crimson Text',
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
    fontFamily: 'Crimson Text',
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
  },
  addText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Crimson Text',
    fontWeight: '700',
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
    fontWeight: '700',
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
  },
  editText: {
    color: '#000',
    fontSize: 18,
    fontFamily: 'Crimson Text',
    fontWeight: '700',
  },
});
