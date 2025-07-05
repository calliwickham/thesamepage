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
import Button from '../newcomps/Button';
import {ALBUMSTHEMES} from '../constants/AlbumsThemes.js'

const dummyAlbumsData = [
    { key: "daily", files: 25, edited: '10/03/2023' },
    { key: "freewrite", files: 10, edited: '11/23/2024' },
    { key: "collaborative", files: 12, edited: '8/03/2025' },
    { key: "favorites", files: 7, edited: null },
    { key: "trash", files: 128, edited: null },
];

const albumsThemes = ALBUMSTHEMES;

const cardHeight = Dimensions.get('window').height / 6.5;

export default function Albums() {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>My Albums</Text>
            <SearchBox placeholder="Search for..." style={styles.search} />
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {dummyAlbumsData.map((album, index) => (
                    <View
                        key={index}
                        style={[styles.card, { backgroundColor: albumsThemes[album.key].color }, { borderColor: albumsThemes[album.key].border }]}
                    >
                        {/* Upper Section */}
                        <View style={styles.upperSection}>
                            <Text style={styles.albumTitle}>
                                {albumsThemes[album.key].name}{album.key == 'favorites' || album.key == 'trash' ? "" : " Album"} 
                            </Text>
                        </View>

                        {/* Divider Line */}
                        <View style={styles.divider} />

                        {/* Lower Section */}
                        <View style={styles.lowerSection}>
                            <View style={styles.leftTextContainer}>
                                <Text style={styles.descriptionText}>
                                    {album.edited ? "Last Edited: " + album.edited + "\n" : ""}
                                    Number of Files: {album.files}
                                </Text>
                            </View>
                            <View style={styles.rightPlaceholder}>
                                <Button style={{marginLeft: 10}} onPress={() => navigation.navigate('GenericAlbum', { albumKey: album.key })}>View Files</Button>
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
    search: {
        marginLeft: '5%',
        marginRight: '5%',
        marginTop: 8,
        marginBottom: 20
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