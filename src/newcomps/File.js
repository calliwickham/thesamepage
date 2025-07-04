import { View, StyleSheet, Text } from "react-native";
import TileWithFoldedCorner from "../newcomps/TileWithFoldedCorner"


export default function File({album, data}){

    return (
        <TileWithFoldedCorner>
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