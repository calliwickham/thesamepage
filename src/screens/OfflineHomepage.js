import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BlurView } from 'expo-blur';

import InProgressIcon from '../newcomps/InProgressIcon';
import CheckBoxIcon from '../newcomps/CheckBoxIcon';
import YellowNotif from '../newcomps/YellowNotif';
import CalendarIcon from '../newcomps/CalendarIcon';
import SinglePage from '../newcomps/SinglePage';
import Puzzle from '../newcomps/Puzzle';

export default function OfflineHomepage() {
    const navigation = useNavigation();


    //skewed card constructor
    const SkewedCard = ({ backgroundColor, borderColor, position, icon, title, text, notif, inProgress, isBlurred }) => {
        const CardContent = (
            <>
                <View style={[styles.circle, {borderColor}]}>{icon}</View>
                <View style={styles.textContainer}>
                    <Text style={styles.cardTitle}>{title}</Text>
                    <Text style={styles.cardText}>{text}</Text>
                </View>
                {notif && <View style={styles.topRight}><YellowNotif /></View>}
                {inProgress && <View style={styles.topRight}><InProgressIcon /></View>}
                {title === "Daily Challenge" && (
                    <View style={styles.bottomRight}><CheckBoxIcon /></View>
                )}
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
                            must have an <Text style={{ fontWeight: 'bold' }}>Online Account</Text>. You may{'\n'}
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
                    navigation.navigate('OnlineSettingsPage'); // placeholder
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
                <Text style={styles.header}>Welcome, Anastasia</Text>

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
        fontWeight: '700',
        marginBottom: 20,
        fontFamily: 'Crimson Text',
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
        fontWeight: '700',
        fontFamily: 'Crimson Text',
        marginBottom: 4,
    },
    cardText: {
        fontSize: 18,
        fontFamily: 'Crimson Text',
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
        fontFamily: 'Crimson Text',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '600',
        lineHeight: 22,
    },
});
