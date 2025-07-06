import { SafeAreaView, ScrollView, StyleSheet, View, Text, Image } from 'react-native';
import { useRoute } from "@react-navigation/native";

import FileCard from '../newcomps/FileCard.js';
import SearchBox from '../newcomps/SearchBox.js'
import { ALBUMSTHEMES } from "../constants/AlbumsThemes.js"


export default function GenericAlbum({ navigation }) {
    const route = useRoute();
    //destructure params
    const { albumKey } = route.params;
    const albumThemes = ALBUMSTHEMES;

    const dummyFiles = [
        {
            id: 1,
            album: 'freewrite',
            title: 'just learned how babies are made',
            date: '8/12/2023',
            wordcount: 475,
            text: `Dear Diary, \nIm traumatized. I’m having a little sister and I was sooooo curious how she was made so 
            I lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque  faucibus ex sapien vitae pellentesque sem placerat.`
        },
        {
            id: 1,
            album: 'freewrite',
            title: 'a very very long title, notice that this person didn’t finish their work',
            date: '8/12/2023',
            wordcount: 475,
            text: `Random stuff typing random stuff forever random stuff lorem ipsum dolor sit amet consectetur adipiscing elit.`
        },
        {
            id: 1,
            album: 'collaborative',
            authors: 'Anatasia, Connor',
            title: 'The Ramen Noodle Shop',
            date: '7/2/2025',
            text: `The sun rose over the hill...`,
            wordcount: 12,
        },
        {
            id: 2,
            album: 'daily',
            title: 'ostrich, speed, pavement',
            date: '6/3/2025',
            text: `An ostrich sped across the pavement, alarming the neighbors.`,
            wordcount: 123
        }
    ]

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}> {albumThemes[albumKey].shortName} Files</Text>
            <SearchBox placeholder="Search for..." style={styles.search} />
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {dummyFiles.map((file, i) => (
                    <FileCard key={i} file={file} />
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
        fontFamily: 'CrimsonText-BoldItalic',
        textAlign: 'center',
        marginVertical: 16,
        fontWeight: 'bold',
        marginBottom: 0
    },
    scrollContainer: {
        paddingBottom: 6,
        paddingLeft: '5%',
        paddingRight: '5%',
    },
});