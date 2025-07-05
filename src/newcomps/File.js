import { View, StyleSheet, Text } from "react-native";
import TileWithFoldedCorner from "../newcomps/TileWithFoldedCorner"


export default function File({ album, data }) {

    const albumThemes = {
        collaborative: {
            color: "#E3EBDD",
            border: "#C9D2C3",
            allowBookmarks: true,
        },
        daily: {
            color: "#FFF4E2",
            border: "#E7DBC8",
            allowBookmarks: true,
        },
        freewrite: {
            color: "#E4E4E4",
            border: "#CFCFCF",
            allowBookmarks: true,
        },
        favorites: {
            color: "#FFFFFF",
            border: "#E4E4E4",
            allowBookmarks: true,
        },
        trash: {
            color: "#F8D7DA",
            border: "#eeb2b6",
            allowBookmarks: true,
            showInProgressFirst: true,
        },
    };

    return (
        <TileWithFoldedCorner style={{height: 130}} fill={albumThemes[album].color} line={albumThemes[album].border}>
            {/*content of tile*/}
            <View style={styles.upperSection}>
                <Text style={styles.title}>The Ramen Noodle Shop</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.lowerSection}>
                <Text style={styles.text}>
                    Authors: Anastasia, Connor, Friend101, Lizzie
                    {'\n'}Date Created: 04/12/2025
                    {'\n'}560 words
                </Text>
            </View>

        </TileWithFoldedCorner >
    );

}

const styles = StyleSheet.create({
    title: {
        marginLeft: '5%',
        marginRight: '5%',
        fontSize: 20,
        fontFamily: 'Crimson Text',
    },
    upperSection: {
        flex: 0.4,
        justifyContent: 'center',
        alignSelf: 'flex-start'
    },
    divider: {
        height: 1,
        backgroundColor: 'black',
        marginVertical: 4,
        width: '94%',
        marginRight: 3
    },
    lowerSection: {
        flex: 0.6,
        justifyContent: 'flex-start',
        alignSelf: 'flex-start',
        marginTop: 4,
        marginLeft: '5%',
        marginRight: '5%'
    },
    text: {
        fontSize: 14,
        fontFamily: 'Crimson Text',
        textAlign: 'left',
        color: '#3F3F3F'
    }
});