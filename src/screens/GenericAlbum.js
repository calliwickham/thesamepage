import { SafeAreaView, ScrollView, StyleSheet, View, Text, Image } from 'react-native';
import { useRoute } from "@react-navigation/native";

import TileWithFoldedCorner from '../newcomps/TileWithFoldedCorner.js';
import File from '../newcomps/File.js';


export default function GenericAlbum({ navigation }) {
    const route = useRoute();
    //destructure params
    const { albumName } = route.params;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white', alignItems: 'center' }}>
            <View style={{ borderWidth: 1, borderColor: 'blue', borderStyle: 'solid', width: '90%', alignItems: 'center'}}>
                <Text> Meep </Text>
                <View style={{ width: "90%", borderWidth: 1, borderColor: "red" }}>
                    <TileWithFoldedCorner>
                        <Text> Hello, this is NOT a file </Text>
                    </TileWithFoldedCorner>
                    <File album="collaborative"/>
                </View>
            </View>
        </SafeAreaView>
    );
}

