import { SafeAreaView, ScrollView, StyleSheet, View, Text, Image } from 'react-native';
import TileWithFoldedCorner from '../components/testicons/TileWithFoldedCorner.js';




export default function GenericAlbumPage() {



    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
                <TileWithFoldedCorner>
                    <View style={{flex: 1, justifyContent: 'center'}}>
                        <Text> Hello World!</Text>
                    </View>
                </TileWithFoldedCorner>
                <TileWithFoldedCorner>
                    <Image
                        source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Kot_Leon.JPG/1280px-Kot_Leon.JPG" }}
                        style={{
                            width: "85%",
                            height: "85%",
                            borderRadius: 5,
                        }}
                        resizeMode="cover"
                    />
                </TileWithFoldedCorner>
            </ScrollView>
        </SafeAreaView>
    );
}

