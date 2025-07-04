import { SafeAreaView, ScrollView, StyleSheet, View, Text, Image } from 'react-native';
import TileWithFoldedCorner from '../newcomps/TileWithFoldedCorner.js';
import File from '../newcomps/File.js';


export default function GenericAlbum({ navigation }) {

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white', alignItems: 'center' }}>
            <View style={{ borderWidth: 1, borderColor: 'blue', borderStyle: 'solid', width: '80%', alignItems: 'center'}}>
                <Text> Meep </Text>
                <View style={{ width: "80%", borderWidth: 1, borderColor: "red" }}>
                    <TileWithFoldedCorner>
                        <Text> Hello </Text>
                    </TileWithFoldedCorner>
                    <File data={["This is a File", "file"]}/>
                </View>
            </View>
        </SafeAreaView>
    );
}

