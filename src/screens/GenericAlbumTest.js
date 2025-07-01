import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import TileWithFoldedCorner from '../components/testicons/TileWithFoldedCorner.js';

import { Dimensions } from 'react-native';



export default function GenericAlbumPage() {

    const screenWidth = Dimensions.get('window').width;
    const tileWidth = screenWidth * 0.9;
    const tileHeight = tileWidth * (132 / 324); // maintain the original aspect ratio

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
                <View style={{ width: tileWidth, height: tileHeight, marginVertical: 12}}>
                    <TileWithFoldedCorner />
                </View>
                <View style={{ width: tileWidth, height: tileHeight, marginVertical: 12}}>
                    <TileWithFoldedCorner />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
