import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';

import TileWithFoldedCorner from "./TileWithFoldedCorner"
import { ALBUMSTHEMES } from "../constants/AlbumsThemes.js"
import InProgressIcon from "./InProgressIcon.js"

const albumThemes = ALBUMSTHEMES;

export default function FileCard({ file }) {

    function onPress() {

        console.log(file);

        if (file.album === 'freewrite' && 'published' in file && file.published === false){
            navigation.navigate("FreeWriteScreen2", {file})
            //alert('Functionality incoming! Please wait.');
        }
        else {
            navigation.navigate('FileViewer', { file });
        }
    }

    const navigation = useNavigation();

    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => onPress()}
        >
            {file?.published === false && (
                <View style={[styles.upperRightIcon]}>
                    <InProgressIcon />
                </View>
            )}
            <TileWithFoldedCorner style={[{ height: albumThemes[file.album].cardHeight, marginVertical: 4 }]} fill={albumThemes[file.album].color} line={albumThemes[file.album].border}>
                {/*content of tile*/}
                <View style={[styles.upperSection, { flex: albumThemes[file.album].cardTitleFlex }]}>
                    <Text style={styles.title} adjustsFontSizeToFit={false} numberOfLines={2}>{file.title}</Text>
                </View>
                <View style={styles.divider} />
                <View style={[styles.lowerSection, { flex: 1 - albumThemes[file.album].cardTitleFlex }]}>
                    {file.album === 'collaborative' && (
                        <Text style={styles.cardText}>
                            Authors: <Text style={{ fontFamily: 'CrimsonText-Italic' }}>{file.authors}</Text>
                        </Text>
                    )}

                    <Text style={[styles.cardText, { fontFamily: 'CrimsonText-Italic' }]}>
                        Date Created: {file.date}
                    </Text>

                    {file.album !== 'freewrite' && (
                        <Text style={[styles.cardText, { fontFamily: 'CrimsonText-Italic' }]}>
                            {file.wordcount} words
                        </Text>
                    )}

                    {file.album === 'freewrite' && (
                        <Text
                            style={styles.cardText}
                            numberOfLines={3}
                            ellipsizeMode="tail"
                            adjustsFontSizeToFit={false}
                        >
                            {file.text.replace(/\n/g, ' ')}
                        </Text>
                    )}
                </View>
            </TileWithFoldedCorner >
        </TouchableOpacity>
    );

}

const styles = StyleSheet.create({
    title: {
        marginLeft: '5%',
        marginRight: '5%',
        fontSize: 22,
        fontFamily: 'CrimsonText-SemiBold',
        padding: 0,
        textVerticalAlign: 'center'
    },
    upperSection: {
        width: '90%',
        //borderColor: 'red',
        //borderStyle: 'dotted',
        //borderWidth: 1,
        flex: 0.5,
        justifyContent: 'center',
        alignSelf: 'flex-start'
    },
    divider: {
        height: 1,
        backgroundColor: 'black',
        width: '94%',
        marginRight: 3
    },
    lowerSection: {
        flex: 0.5,
        justifyContent: 'center',
        alignSelf: 'flex-start',
        marginLeft: '5%',
        marginRight: '10%',
        marginBottom: 6,
        //borderColor: 'limegreen',
        //borderStyle: 'dotted',
        //borderWidth: 1
    },
    cardText: {
        fontSize: 14,
        fontFamily: 'CrimsonText-Regular',
        textAlign: 'left',
        color: '#3F3F3F'
    },
    upperRightIcon: {
        position: 'absolute',
        top: 0,
        right: 10,
        zIndex: 2
    },
    debug: {
        borderColor: 'orange',
        borderStyle: 'dashed',
        borderWidth: 2
    }
});