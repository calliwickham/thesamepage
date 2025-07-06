//For now this screen is very ugly, just a placeholder.

import { SafeAreaView, ScrollView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from "@react-navigation/native";
import NavArrow from '../newcomps/NavArrow';

export default function FileViewer() {

    const navigation = useNavigation();
    const route = useRoute();
    const { file } = route.params;

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                activeOpacity={0.4}
                style={{marginTop: 4}}
            >
                <NavArrow />
            </TouchableOpacity>
            <Text style={styles.header}> {file.title} </Text>
            <Text style={{ color: 'red', fontWeight: 'bold', margin: 10 }}> Still in development: This page isn't complete! </Text>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.text}> {file.text} </Text>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        fontSize: 32,
        fontFamily: 'Crimson Text',
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 16,
        fontWeight: 'bold',
        marginBottom: 0
    },
    scrollContainer: {
        paddingBottom: 6,
        paddingLeft: '5%',
        paddingRight: '5%',
    },
    text: {
        fontSize: 16,
        fontFamily: 'Crimson Text',
        textAlign: 'left',
    }
});