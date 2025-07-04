import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SearchBox from '../newcomps/SearchBox';

const albumData = [
    { name: 'Collaborative Writing Album', borderColor: "#E4E4E4", color: '#E3EBDD', route: 'GenericAlbumPage' },
    { name: 'Daily Challenge Album', borderColor: "#E4E4E4", color: '#FFF4E2', route: 'GenericAlbumPage' },
    { name: 'Free Writing Album', borderColor: "#D9D9D9", color: '#E4E4E4', route: 'GenericAlbumPage' },
    { name: 'Favorites', borderColor: "#E4E4E4", color: '#FFFFFF', route: 'GenericAlbumPage' },
    { name: 'Trash', borderColor: "#E4E4E4", color: '#F8D7DA', route: 'GenericAlbumPage' },
];

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const cardHeight = screenHeight / 7;

export default function Albums() {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>My Albums</Text>
            <SearchBox placeholder="Search for..." />
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {albumData.map((album, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[styles.card, { backgroundColor: album.color }, { borderColor: album.borderColor }]}
                        onPress={() => navigation.navigate(album.route)}
                        activeOpacity={0.8}
                    >
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
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        fontSize: 32,
        fontFamily: 'Crimson Text',
        marginVertical: 16,
        fontWeight: 'bold',
        paddingLeft: '5%',
        marginBottom: 0
    },
    scrollContainer: {
        paddingBottom: 0,
        paddingLeft: '5%',
        paddingRight: '5%'
    },
    searchBoxContainer: {
        marginTop: 10,
        marginBottom: 10,
        paddingLeft: '5%',
        paddingRight: '5%'
    },
    card: {
        width: '100%',
        height: cardHeight,
        borderRadius: 16,
        marginBottom: 20,
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 12,
        paddingRight: 12,
        borderColor: '#E4E4E4',
        borderStyle: 'solid',
        borderWidth: 1,
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
    },
});