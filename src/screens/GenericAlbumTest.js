import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import TileWithFoldedCorner from '../components/testicons/TileWithFoldedCorner.js';




export default function GenericAlbumPage() {

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
                <TileWithFoldedCorner />
            </ScrollView>
        </SafeAreaView>
    );
}
