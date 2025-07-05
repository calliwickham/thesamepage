import { View, StyleSheet, Text } from "react-native";

import TileWithFoldedCorner from "./TileWithFoldedCorner"
import {ALBUMSTHEMES} from "../constants/AlbumsThemes.js"

const albumThemes = ALBUMSTHEMES;

export default function FileCard({ file }) {

    return (
        <TileWithFoldedCorner style={[{ height: albumThemes[file.album].cardHeight, marginVertical: 4 }]} fill={albumThemes[file.album].color} line={albumThemes[file.album].border}>
            {/*content of tile*/}
            <View style={[styles.upperSection, { flex: albumThemes[file.album].cardTitleFlex }]}>
                <Text style={styles.title} adjustsFontSizeToFit={false} numberOfLines={2}>{file.title}</Text>
            </View>
            <View style={styles.divider} />
            <View style={[styles.lowerSection, { flex: 1 - albumThemes[file.album].cardTitleFlex }]}>
                <Text style={styles.cardText}>
                    {file.album == 'collaborative' ? (
                        <>
                            Authors: <Text style={{ fontStyle: 'italic' }}>{file.authors}</Text>{'\n'}
                        </>
                    ) : ""}
                    Date Created: {file.date}{'\n'}
                    {file.album != 'freewrite' ? <Text style={{ fontStyle: 'italic' }}>{file.wordcount} words {'\n'}</Text> : null}
                    {file.album == 'freewrite' ? <Text>{file.text}</Text> : null}
                </Text>
            </View>

        </TileWithFoldedCorner >
    );

}

const styles = StyleSheet.create({
    title: {
        marginLeft: '5%',
        marginRight: '5%',
        fontSize: 22,
        fontFamily: 'Crimson Text',
        padding: 0,
        textVerticalAlign: 'center'
    },
    upperSection: {
        width: '98%',
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
        marginBottom: 6,
        width: '94%',
        marginRight: 3
    },
    lowerSection: {
        flex: 0.5,
        justifyContent: 'center',
        alignSelf: 'flex-start',
        marginLeft: '5%',
        marginRight: '10%',
        marginBottom: 4,
    },
    cardText: {
        fontSize: 14,
        fontFamily: 'Crimson Text',
        textAlign: 'left',
        color: '#3F3F3F'
    }
});