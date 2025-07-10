import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BlurView } from 'expo-blur';

import InProgressIcon from '../newcomps/InProgressIcon';
import CheckBoxIcon from '../newcomps/CheckBoxIcon';
import YellowNotif from '../newcomps/YellowNotif';
import YellowWarning from '../newcomps/YellowWarning';
import CalendarIcon from '../newcomps/CalendarIcon';
import SinglePage from '../newcomps/SinglePage';
import Puzzle from '../newcomps/Puzzle';

//firebase imports
import { collection, query, where, getDocs, getDoc, deleteDoc, doc } from 'firebase/firestore';
import { auth, firestore } from '../constants/firebaseConfig';

export default function OfflineHomepage() {
    const navigation = useNavigation();

    //For daily challenge notifs
    const [dataFetched, setDataFetched] = useState(false);
    const [todaysChallenge, setTodaysChallenge] = useState(null);
    const [challengeStatus, setChallengeStatus] = useState('none'); // 'none' | 'in-progress' | 'completed'
    useEffect(() => {
        const cleanupUnpublishedChallenges = async () => {
            try {
                const userId = auth.currentUser?.uid;

                //console.log("user id is" + userId);
                if (!userId) return;

                const dailyRef = collection(firestore, 'Users', userId, 'DailyChallenges');
                const unpublishedQuery = query(dailyRef, where('published', '==', false));
                const snapshot = await getDocs(unpublishedQuery);

                const todayISO = new Date().toISOString().split('T')[0];
                const deletionPromises = [];

                snapshot.docs.forEach(docSnap => {
                    const data = docSnap.data();
                    const entryDate = data.date?.toDate?.();

                    if (!entryDate) {
                        console.warn(`Skipping deletion: missing or invalid date for doc ${docSnap.id}`);
                        return;
                    }

                    const entryISO = entryDate.toISOString().split('T')[0];

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

        const runStartupChecks = async () => {
            await cleanupUnpublishedChallenges();
            await checkDailyChallengeStatus();
        };

        console.log(challengeStatus);

        runStartupChecks();
    }, []);

    //skewed card constructor
    const SkewedCard = ({ backgroundColor, borderColor, position, icon, title, text, notif, inProgress, isBlurred }) => {
        const CardContent = (
            <>
                <View style={[styles.circle, { borderColor }]}>{icon}</View>
                <View style={[styles.textContainer]}>
                    <Text style={styles.cardTitle}>{title}</Text>
                    <Text style={styles.cardText}>{text}</Text>
                    {title === 'Daily Challenge' && dataFetched && challengeStatus === 'none' ? <View style={styles.topRight}><YellowWarning /></View> : null}
                    {title === 'Daily Challenge' && challengeStatus === 'completed' ? <View style={styles.bottomRight}><CheckBoxIcon /></View> : null}
                    {title === 'Daily Challenge' && challengeStatus === 'in-progress' ? <View style={styles.bottomRight}><InProgressIcon /></View> : null}
                </View>
            </>
        );

        return isBlurred ? (
            <View style={[styles.shadowWrapper]}>
                <View
                    style={[
                        styles.card,
                        position === "right" && styles.right,
                        { backgroundColor },
                        { overflow: 'hidden' }
                    ]}
                >
                    <BlurView
                        intensity={25}
                        tint="light"
                        style={StyleSheet.absoluteFill}
                    />

                    {CardContent}
                    <View style={styles.errorBox}>
                        <Text style={styles.errorText}>
                            To access Collaborative Mode, you{'\n'}
                            must have an <Text style={{ fontWeight: '500', fontFamily: 'CrimsonText-SemiBold' }}>Online Account</Text>. You may{'\n'}
                            update your account type in Settings.
                        </Text>
                    </View>
                </View>
            </View>
        ) : (
            <TouchableOpacity
                onPress={() => {
                    if (title === "Free Write") {
                        navigation.navigate('FreeWriteScreen1');
                    } else if (title === "Daily Challenge") {
                        if (!dataFetched) return;
                        if (challengeStatus === 'completed') {
                            alert('Challenge already completed!');
                        }
                        else {
                            navigation.navigate('DailyChallengeScreen', { file: todaysChallenge });
                        }
                    }
                }}
            >
                <View
                    style={[
                        styles.card,
                        { backgroundColor },
                        position === "left" && styles.left,
                        position === "right" && styles.right,
                    ]}
                >
                    {CardContent}
                </View>
            </TouchableOpacity>
        );
    };

    //homepage
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.header}>Welcome, Guest</Text>

                <SkewedCard
                    backgroundColor="#FFF1DC"
                    borderColor="#F8E6C7"
                    icon={<CalendarIcon width={40} height={40} />}
                    title="Daily Challenge"
                    text="Get a fresh prompt to inspire you"
                    position="right"
                    notif
                />

                <SkewedCard
                    backgroundColor="#E4E4E4"
                    borderColor="#DDDDDD"
                    icon={<SinglePage width={40} height={40} />}
                    title="Free Write"
                    text="Let your thoughts run wild on the page"
                    position="left"
                />

                <SkewedCard
                    backgroundColor="#E9F0E6"
                    borderColor="#DBE9D4"
                    icon={
                        <View style={{ transform: [{ translateX: -3 }, { translateY: -2 }] }}>
                            <Puzzle width={40} height={40} />
                        </View>
                    }
                    title="Collaborative Mode"
                    text="Weave a story together with new friends"
                    position="right"
                    isBlurred
                />
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
        //borderWidth: 2,
        //borderColor: 'blue',
        //borderStyle: 'solid'
    },
    header: {
        fontSize: 38,
        fontWeight: '600',
        marginBottom: 20,
        fontFamily: 'CrimsonText-Bold',
        paddingLeft: '5%'
    },
    card: {
        //borderRadius: 16,
        padding: 16,
        marginTop: 24,
        marginBottom: 26,
        flexDirection: 'row',
        alignItems: 'center',
        minHeight: 120,
        position: 'relative',
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
    shadowWrapper: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4, // for Android
        marginBottom: 26, // move margin here from styles.card
    },
    circle: {
        width: 76,
        height: 76,
        borderRadius: '50%',
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: 'white'
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
        fontFamily: 'CrimsonText-Regular',
    },
    topRight: {
        position: 'absolute',
        top: -30,
        right: 0,
    },
    bottomRight: {
        position: 'absolute',
        bottom: -10,
        right: 0,
    },
    errorBox: {
        borderColor: '#ff7270',
        borderStyle: 'solid',
        borderWidth: 1,
        position: 'absolute',
        top: '55%',
        left: '8%',
        right: '5%',
        backgroundColor: '#FFECEC',
        borderRadius: 12,
        padding: 8,
        transform: [{ translateY: -30 }],
        elevation: 3,
        shadowColor: '#000', // iOS shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    errorText: {
        color: '#F00',
        textAlign: 'center',
        fontFamily: 'CrimsonText-SemiBold',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '600',
        lineHeight: 22,
    },
    debugBorder: {
        borderColor: 'blue',
        borderWidth: 2,
        borderStyle: 'dashed'
    }
});
