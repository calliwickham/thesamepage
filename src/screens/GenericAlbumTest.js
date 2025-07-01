
import TileWithFoldedCorner from '../components/testicons/TileWithFoldedCorner.js';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';

export default function GenericAlbumPage() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TileWithFoldedCorner/>
        <TileWithFoldedCorner/>
        <TileWithFoldedCorner/>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f2f2f2',
    },
    scrollContainer: {
        alignItems: 'center',
        paddingVertical: 24,
    }
})