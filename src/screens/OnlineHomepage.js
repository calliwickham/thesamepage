import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import InProgressIcon from '../newcomps/InProgressIcon';
import CheckBoxIcon from '../newcomps/CheckBoxIcon';
import YellowNotif from '../newcomps/YellowNotif';
import CalendarIcon from '../newcomps/CalendarIcon';
import SinglePage from '../newcomps/SinglePage';
import Puzzle from '../newcomps/Puzzle';

export default function OfflineHomepage() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.header}>Welcome, Anastasia</Text>

                {/*DEBUG, REMOVE LATER - Buttons for vewing other screens not accessible rn*/}
                <Button color='error' 
                    style={{position: 'absolute', left: 10, top: 5, paddingVertical: 2}}
                    onPress={() => navigation.navigate('Debug')}>Debug - components</Button>
                <Button 
                    color='error' 
                    style={{position: 'absolute', right: 10, top: 5, paddingVertical: 2}}
                    onPress={() => navigation.navigate('OfflineHomepage')}>Debug - offline homepage</Button>
                

                {/* Daily Challenge */}
                <TouchableOpacity
                    style={[styles.card, { backgroundColor: '#FFF1DC' }, styles.right]}
                    onPress={() => navigation.navigate('Challenge')}
                >
                    <View style={[styles.circle, {borderColor: '#F8E6C7'}]}>
                        <CalendarIcon width={40} height={40} />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.cardTitle}>Daily Challenge</Text>
                        <Text style={styles.cardText}>Get a fresh prompt to inspire you</Text>
                    </View>
                    <View style={styles.topRight}>
                        <YellowNotif />
                    </View>
                    <View style={styles.bottomRight}>
                        <CheckBoxIcon />
                    </View>
                </TouchableOpacity>

                {/* Free Write */}
                <TouchableOpacity
                    style={[styles.card, { backgroundColor: '#E4E4E4' }, styles.left]}
                    onPress={() => navigation.navigate('FreeWriteScreen1')}
                >
                    <View style={[styles.circle, {borderColor: '#DDDDDD'}]}>
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
                    onPress={() => navigation.navigate('CollaborativeLanding')}
                >
                    <View style={[styles.circle, {borderColor: '#DBE9D4'} ]}>
                        <View style={{ transform: [{ translateX: -3 }, { translateY: -2 }] }}>
                            <Puzzle width={40} height={40} />
                        </View>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.cardTitle}>Collaborative Mode</Text>
                        <Text style={styles.cardText}>Weave a story together with new friends</Text>
                    </View>
                    <View style={styles.topRight}>
                        <InProgressIcon />
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
        fontWeight: '700',
        marginBottom: 20,
        fontFamily: 'Crimson Text',
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
});
