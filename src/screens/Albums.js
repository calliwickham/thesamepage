import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Dimensions,
} from 'react-native';
import SearchBox from '../newcomps/SearchBox';

const albumData = [
    { name: 'Collaborative Writing Album', color: '#E3EBDD' },
    { name: 'Free Writing Album', color: '#FFF4E2' },
    { name: 'Daily Challenge Album', color: '#E4E4E4' },
    { name: 'Favorites', color: '#FFFFFF' },
    { name: 'Trash', color: '#F8D7DA' }, // Soft red for trash
];

const screenWidth = Dimensions.get('window').width;
const cardHeight = 180;

export default function Albums() {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>My Albums</Text>
            <SearchBox placeholder="Search for..." />
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {albumData.map((album, index) => (
                    <View key={index} style={[styles.card, { backgroundColor: album.color }]}>
                        {/* Upper Section */}
                        <View style={styles.upperSection}>
                            <Text style={styles.albumTitle}>{album.name}</Text>
                        </View>

                        {/* Divider Line */}
                        <View style={styles.divider} />

                        {/* Lower Section */}
                        <View style={styles.lowerSection}>
                            <View style={styles.leftTextContainer}>
                                <Text style={styles.descriptionText}>
                                    This is a short description of the album.
                                </Text>
                            </View>
                            <View style={styles.rightPlaceholder}>
                                {/* Button goes here later */}
                            </View>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 16,
    },
    header: {
        fontSize: 32,
        fontFamily: 'Crimson Text',
        marginVertical: 16,
    },
    scrollContainer: {
        paddingBottom: 24,
    },
    card: {
        width: '100%',
        height: cardHeight,
        borderRadius: 16,
        marginBottom: 20,
        padding: 16,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    upperSection: {
        flex: 0.4,
        justifyContent: 'center',
    },
    albumTitle: {
        fontSize: 24,
        fontStyle: 'italic',
        fontFamily: 'Crimson Text',
    },
    divider: {
        height: 1,
        backgroundColor: 'black',
        marginVertical: 4,
    },
    lowerSection: {
        flex: 0.6,
        flexDirection: 'row',
        marginTop: 4,
    },
    leftTextContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    descriptionText: {
        fontSize: 16,
        fontFamily: 'Crimson Text',
    },
    rightPlaceholder: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // Placeholder for future button
    },
});