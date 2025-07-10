import React, { useEffect, useState } from 'react';
import {
    View, Text, TouchableOpacity, StyleSheet, ScrollView, Modal
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth, firestore } from '../constants/firebaseConfig';
import {
    collection, getDocs, doc, setDoc, deleteDoc, getDoc
} from 'firebase/firestore';

export default function FriendRequests() {
    const navigation = useNavigation();
    const [requests, setRequests] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const user = auth.currentUser;

    useEffect(() => {
        const fetchRequests = async () => {
            if (!user) return;
            try {
                const snapshot = await getDocs(collection(firestore, 'Users', user.uid, 'FriendRequests'));
                const loadedRequests = [];

                for (const docSnap of snapshot.docs) {
                    const requestData = docSnap.data();
                    const senderRef = doc(firestore, 'Users', docSnap.id);
                    const senderSnap = await getDoc(senderRef);
                    const senderData = senderSnap.exists() ? senderSnap.data() : {};

                    loadedRequests.push({
                        id: docSnap.id,
                        message: requestData.message || '',
                        name: senderData.penname || 'Unknown User',
                        bio: senderData.bio || 'No bio submitted.',
                    });
                }

                setRequests(loadedRequests);
            } catch (error) {
                console.error("Error loading friend requests:", error);
            }
        };
        fetchRequests();
    }, []);

    const handleAccept = async (request) => {
        try {
            const requesterId = request.id;
            const receiverId = user.uid;

            // Get both users' pennames
            const requesterSnap = await getDoc(doc(firestore, 'Users', requesterId));
            const receiverSnap = await getDoc(doc(firestore, 'Users', receiverId));
            const requesterPenname = requesterSnap.exists() ? requesterSnap.data().penname : 'Friend';
            const receiverPenname = receiverSnap.exists() ? receiverSnap.data().penname : 'You';

            // Add each other as friends with penname
            await setDoc(doc(firestore, 'Users', receiverId, 'Friends', requesterId), {
                friendId: requesterId,
                penname: requesterPenname,
                added: new Date(),
            });
            await setDoc(doc(firestore, 'Users', requesterId, 'Friends', receiverId), {
                friendId: receiverId,
                penname: receiverPenname,
                added: new Date(),
            });

            // Delete request
            await deleteDoc(doc(firestore, 'Users', receiverId, 'FriendRequests', requesterId));

            setRequests(prev => prev.filter(r => r.id !== requesterId));
            setSelectedRequest(null);
            alert(`${request.name || 'User'} accepted!`);
        } catch (error) {
            console.error("Accept error:", error);
            alert("Error accepting request.");
        }
    };

    const handleDelete = async (request) => {
        try {
            await deleteDoc(doc(firestore, 'Users', user.uid, 'FriendRequests', request.id));
            setRequests(prev => prev.filter(r => r.id !== request.id));
            setSelectedRequest(null);
            alert(`${request.name || 'User'} deleted.`);
        } catch (error) {
            console.error("Delete error:", error);
            alert("Error deleting request.");
        }
    };

    const handleClearAll = async () => {
        try {
            for (const request of requests) {
                await deleteDoc(doc(firestore, 'Users', user.uid, 'FriendRequests', request.id));
            }
            setRequests([]);
            alert('All friend requests cleared.');
        } catch (error) {
            console.error("Clear all error:", error);
            alert("Error clearing requests.");
        }
    };

    return (
        <View style={styles.container}>
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
                            <Text style={styles.name}>{request.name || 'Unknown User'}</Text>
                            <TouchableOpacity
                                style={styles.viewButton}
                                onPress={() => setSelectedRequest(request)}
                            >
                                <Text style={styles.viewText}>View Request</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.message}>{request.message || ''}</Text>
                    </View>
                ))}

                {requests.length > 0 && (
                    <TouchableOpacity style={styles.clearButton} onPress={handleClearAll}>
                        <Text style={styles.clearText}>Clear All Requests</Text>
                    </TouchableOpacity>
                )}
            </ScrollView>

            {selectedRequest && (
                <Modal transparent animationType="fade">
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalBox}>
                            <View style={styles.modalHeaderRow}>
                                <Text style={styles.modalTitle}>Friend Request:</Text>
                                <TouchableOpacity onPress={() => setSelectedRequest(null)}>
                                    <Text style={styles.modalClose}>X</Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.modalFriendName}>
                                {selectedRequest.name || 'Unknown User'}
                            </Text>
                            <Text style={styles.modalMessage}>
                                {selectedRequest.bio}
                            </Text>

                            <View style={styles.modalButtons}>
                                <TouchableOpacity
                                    style={styles.acceptButton}
                                    onPress={() => handleAccept(selectedRequest)}
                                >
                                    <Text style={styles.acceptText}>Accept</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.deleteButton}
                                    onPress={() => handleDelete(selectedRequest)}
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
    // Keep your styles exactly the same – no changes
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
        fontWeight: '600',
        fontFamily: 'CrimsonText-Bold',
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
        color: '#000',
        fontSize: 22,
        fontFamily: 'CrimsonText-SemiBold',
        fontWeight: '600',
    },
    viewButton: {
        backgroundColor: '#FFD12D',
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 30,
        elevation: 2,
    },
    viewText: {
        color: 'black',
        fontSize: 16,
        fontFamily: 'CrimsonText-SemiBold',
        fontWeight: '600',
    },
    message: {
        marginTop: 6,
        fontSize: 16,
        fontFamily: 'CrimsonText-Regular',
    },
    clearButton: {
        backgroundColor: '#10471B',
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
        fontSize: 18,
        fontFamily: 'CrimsonText-SemiBold',
        fontWeight: '600',
        color: 'white',
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
        fontFamily: 'CrimsonText-Bold',
        fontWeight: '600',
    },
    modalClose: {
        fontSize: 20,
    },
    modalFriendName:{
        fontSize: 16,
        marginBottom: 5,
        fontFamily: 'CrimsonText-SemiBold',
    },
    modalMessage: {
        fontSize: 16,
        fontFamily: 'CrimsonText-Regular',
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
        fontWeight: '500',
        fontFamily: 'CrimsonText-Bold',
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
        fontWeight: '500',
        fontFamily: 'CrimsonText-Bold',
        color: '#fff',
    },
});
