import { SafeAreaView, ScrollView, StyleSheet, View, Text, Image } from 'react-native';
import TileWithFoldedCorner from '../newcomps/TileWithFoldedCorner.js';


export default function GenericAlbumPage({navigation}) {

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
                <TileWithFoldedCorner shrink='.8'>
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
                <TileWithFoldedCorner margin='12'>
                    <Text> Something here, notice it's not in a flexbox</Text>
                </TileWithFoldedCorner>
                <TileWithFoldedCorner verticalStretch='1.2' shrink='0.8' margin='12'>
                    <Text> Something else here, notice that it's also not in a flexbox. 
                        If you want to style this, you need to pass in your own styled container
                        to add padding, grids, etc.
                        But that makes it dynamic, so you could add a kitten, Hello World centered,
                        or even some text!</Text>
                </TileWithFoldedCorner>
            </ScrollView>
        </SafeAreaView>
    );
}

