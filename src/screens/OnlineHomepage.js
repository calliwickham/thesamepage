import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import InProgressIcon from '../newcomps/InProgressIcon';
import CheckBoxIcon from '../newcomps/CheckBoxIcon';
import YellowWarning from '../newcomps/YellowWarning';
import CalendarIcon from '../newcomps/CalendarIcon';
import SinglePage from '../newcomps/SinglePage';
import Puzzle from '../newcomps/Puzzle';

//firebase imports
import { collection, query, where, getDocs, getDoc, deleteDoc, doc } from 'firebase/firestore';
import { auth, firestore } from '../constants/firebaseConfig';

export default function OnlineHomepage() {
    const navigation = useNavigation();
    const [penname, setPenname] = useState(null);

    useEffect(() => {
        const fetchPenname = async () => {
            try {
                const value = await AsyncStorage.getItem('penname');
                if (value !== null) {
                    setPenname(value);
                }
            } catch (error) {
                console.log('Error fetching penname:', error);
            }
        };

        fetchPenname();
    }, []);


    //For daily challenge notifs
    const [dataFetched, setDataFetched] = useState(false);
    const [todaysChallenge, setTodaysChallenge] = useState(null);
    const [challengeStatus, setChallengeStatus] = useState('none'); // 'none' | 'in-progress' | 'completed'
    useEffect(() => {
        const cleanupUnpublishedChallenges = async () => {
            try {
                const userId = auth.currentUser?.uid;
                if (!userId) return;

                const dailyRef = collection(firestore, 'Users', userId, 'DailyChallenges');
                const unpublishedQuery = query(dailyRef, where('published', '==', false));
                const snapshot = await getDocs(unpublishedQuery);

                const todayISO = new Date().toISOString().split('T')[0];
                const deletionPromises = [];

                snapshot.docs.forEach(docSnap => {
                    const data = docSnap.data();
                    const entryDate = data.date?.toDate?.();
                    const entryISO = entryDate?.toISOString().split('T')[0];

                    if (entryISO !== todayISO) {
                        const deletionRef = doc(firestore, 'Users', userId, 'DailyChallenges', docSnap.id);
                        deletionPromises.push(deleteDoc(deletionRef));
                    }
                });

                await Promise.all(deletionPromises);
            } catch (error) {
                console.error('Error cleaning unpublished challenges:', error);
            }
        };

        const checkDailyChallengeStatus = async () => {
            try {
                const userId = auth.currentUser?.uid;
                const todayId = new Date().toISOString().split('T')[0];
                const todayDocRef = doc(firestore, 'Users', userId, 'DailyChallenges', todayId);
                const todaySnap = await getDoc(todayDocRef);

                if (todaySnap.exists()) {
                    const data = todaySnap.data();

                    if (data.published === true) {
                        setChallengeStatus('completed');
                    } else {
                        setChallengeStatus('in-progress');
                        setTodaysChallenge({ id: todaySnap.id, ...data });
                    }
                } else {
                    setChallengeStatus('none');
                }
                setDataFetched(true);
            } catch (error) {
                console.error('Error loading daily challenge:', error);
            }
        };

        cleanupUnpublishedChallenges();
        checkDailyChallengeStatus();
    }, []);

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.header}>{penname ? `Welcome, ${penname}` : 'Welcome, [Guest]'}</Text>

                {/*DEBUG, REMOVE LATER - Buttons for vewing other screens not accessible rn*/}
                {/* 
                 <Button color='error'
                    style={{ position: 'absolute', left: 10, top: 5, paddingVertical: 2 }}
                    onPress={() => navigation.navigate('Debug')}>Debug - components</Button> */}

                {/* Daily Challenge */}
                <TouchableOpacity
                    style={[styles.card, { backgroundColor: '#FFF1DC' }, styles.right]}
                    onPress={() => {
                        if (challengeStatus === 'completed'){
                            alert('Challenge already completed!');
                        }
                        else {
                            navigation.navigate('DailyChallengeScreen', { file: todaysChallenge });
                        }
                    }}
                >
                    <View style={[styles.circle, { borderColor: '#F8E6C7' }]}>
                        <CalendarIcon width={40} height={40} />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.cardTitle}>Daily Challenge</Text>
                        <Text style={styles.cardText}>Get a fresh prompt to inspire you</Text>
                    </View>
                    {dataFetched && challengeStatus === 'none'? <View style={styles.topRight}><YellowWarning /></View> : null}
                    {challengeStatus === 'completed'? <View style={styles.bottomRight}><CheckBoxIcon /></View> : null}
                    {challengeStatus === 'in-progress'? <View style={styles.bottomRight}><InProgressIcon /></View> : null}
                </TouchableOpacity>

                {/* Free Write */}
                <TouchableOpacity
                    style={[styles.card, { backgroundColor: '#E4E4E4' }, styles.left]}
                    onPress={() => navigation.navigate('FreeWriteScreen1')}
                >
                    <View style={[styles.circle, { borderColor: '#DDDDDD' }]}>
                        <SinglePage width={40} height={40} />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.cardTitle}>Free Write</Text>
                        <Text style={styles.cardText}>Let your thoughts run wild on the page</Text>
                    </View>
                </TouchableOpacity>

                {/* Collaborative Mode */}
                <TouchableOpacity
                    style={[styles.card, { backgroundColor: '#E9F0E6' }, styles.right]}
                    onPress={() => navigation.navigate('CollabWIP')}
                >
                    <View style={[styles.circle, { borderColor: '#DBE9D4' }]}>
                        <View style={{ transform: [{ translateX: -3 }, { translateY: -2 }] }}>
                            <Puzzle width={40} height={40} />
                        </View>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.cardTitle}>Collaborative Mode</Text>
                        <Text style={styles.cardText}>Weave a story together with new friends</Text>
                    </View>
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
    content: {
        //paddingHorizontal: 16,
        paddingTop: 24,
        paddingBottom: 100,
    },
    header: {
        fontSize: 38,
        fontWeight: '500',
        marginBottom: 20,
        fontFamily: 'CrimsonText-Bold',
        paddingLeft: '5%'
    },
    card: {
        //borderRadius: 16,
        padding: 20,
        marginTop: 24,
        marginBottom: 26,
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        minHeight: 120,
        backgroundColor: '#fff',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    left: {
        borderTopRightRadius: 16,
        borderBottomRightRadius: 16,
        marginRight: '10%'
    },
    right: {
        borderTopLeftRadius: 16,
        borderBottomLeftRadius: 16,
        marginLeft: '10%'
    },
    circle: {
        width: 76,
        height: 76,
        borderRadius: 38,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
        borderColor: 'white',
        borderWidth: 2,
        borderStyle: 'solid',
        //elevation: 4,
        //shadowColor: '#000',
        //shadowOffset: { width: 0, height: 2 },
        //shadowOpacity: 0.2,
        //shadowRadius: 4,
    },
    textContainer: {
        flex: 1,
    },
    cardTitle: {
        fontSize: 24,
        fontWeight: '600',
        fontFamily: 'CrimsonText-Bold',
        marginBottom: 4,
    },
    cardText: {
        fontSize: 18,
        fontFamily: 'CrimsonText-SemiBold',
    },
    topRight: {
        position: 'absolute',
        top: '-15%',
        right: 8,
    },
    bottomRight: {
        position: 'absolute',
        bottom: 8,
        right: 8,
    },
});
