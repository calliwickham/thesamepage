import { View, StyleSheet, Text } from "react-native";
import TileWithFoldedCorner from "../newcomps/TileWithFoldedCorner"


export default function File({album, data }) {

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
        <TileWithFoldedCorner fill={albumThemes[album]?.color ?? "#ff0000"} line={albumThemes[album]?.border ?? "#8b0000"}>
            <Text> {data[0]}</Text>
        </TileWithFoldedCorner>
    );

}

const styles = StyleSheet.create({
    upperSection: {
        flex: 0.4,
        justifyContent: 'center',
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
});