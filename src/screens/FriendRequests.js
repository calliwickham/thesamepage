import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function FriendRequests() {
  const navigation = useNavigation();

  const [requests, setRequests] = useState([
    {
      name: 'Joshua',
      message:
        'Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis...',
    },
    {
      name: 'Connor',
      message:
        'Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis...',
    },
    {
      name: 'Finn',
      message:
        'Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis...',
    },
  ]);

  const [selectedRequest, setSelectedRequest] = useState(null);

  const handleAccept = (name) => {
    alert(`${name} accepted!`);
    setRequests(requests.filter((r) => r.name !== name));
    setSelectedRequest(null);
  };

  const handleDelete = (name) => {
    alert(`${name} deleted.`);
    setRequests(requests.filter((r) => r.name !== name));
    setSelectedRequest(null);
  };

  const handleClearAll = () => {
    setRequests([]);
    alert('All friend requests cleared.');
  };

  return (
    <View style={styles.container}>
      {/* Header with Back Arrow */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.header}>Friend Requests</Text>
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 100 }}>
        {requests.map((request, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.cardTopRow}>
              <Text style={styles.name}>{request.name}</Text>
              <TouchableOpacity
                style={styles.viewButton}
                onPress={() => setSelectedRequest(request)}
              >
                <Text style={styles.viewText}>View Request</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.message}>{request.message}</Text>
          </View>
        ))}

        {requests.length > 0 && (
          <TouchableOpacity style={styles.clearButton} onPress={handleClearAll}>
            <Text style={styles.clearText}>Clear All Requests</Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      {/* Modal */}
      {selectedRequest && (
        <Modal transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalBox}>
              <View style={styles.modalHeaderRow}>
                <Text style={styles.modalTitle}>Friend Request: {selectedRequest.name}</Text>
                <TouchableOpacity onPress={() => setSelectedRequest(null)}>
                  <Text style={styles.modalClose}>X</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.modalMessage}>{selectedRequest.message}</Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={styles.acceptButton}
                  onPress={() => handleAccept(selectedRequest.name)}
                >
                  <Text style={styles.acceptText}>Accept</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDelete(selectedRequest.name)}
                >
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
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  backArrow: {
    fontSize: 28,
    marginRight: 12,
    color: '#000',
  },
  header: {
    fontSize: 30,
    fontWeight: '700',
    fontFamily: 'Crimson Text',
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 22,
    fontFamily: 'Crimson Text',
    fontWeight: '700',
  },
  viewButton: {
    backgroundColor: '#10471B',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 30,
    elevation: 2,
  },
  viewText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Crimson Text',
    fontWeight: '700',
  },
  message: {
    marginTop: 6,
    fontSize: 16,
    fontFamily: 'Crimson Text',
  },
  clearButton: {
    backgroundColor: '#FFD12D',
    borderRadius: 30,
    paddingVertical: 14,
    paddingHorizontal: 30,
    alignSelf: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  clearText: {
    fontSize: 20,
    fontFamily: 'Crimson Text',
    fontWeight: '700',
    color: '#000',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 16,
    width: 320,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  modalHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'Crimson Text',
    fontWeight: '700',
  },
  modalClose: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalMessage: {
    fontSize: 16,
    fontFamily: 'Crimson Text',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  acceptButton: {
    backgroundColor: '#FFD12D',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 30,
    elevation: 3,
  },
  acceptText: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Crimson Text',
    color: '#000',
  },
  deleteButton: {
    backgroundColor: '#F02828',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 30,
    elevation: 3,
  },
  deleteText: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Crimson Text',
    color: '#fff',
  },
});
