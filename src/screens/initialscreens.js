// Modernized Screens from The Same Page App
// Using React Native + Tailwind + Functional Components

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, FlatList, StyleSheet } from 'react-native';

// ------------------------------
// 1. Component tester (TRASH AFTER SEEING ALL COMPONENTS)
// ------------------------------
import X from '../newcomps/X'; // adjust path if needed
import SmallTextBox from '../newcomps/SmallTextBox';
import SearchBox from '../newcomps/SearchBox';
import WordCard from '../newcomps/WordCard';
import SaveIcon from '../newcomps/SaveIcon';
import FriendlyNotif from '../newcomps/FriendlyNotif';
import RedNotif from '../newcomps/RedNotif';
import InProgressIcon from '../newcomps/InProgressIcon';
import CheckBoxIcon from '../newcomps/CheckBoxIcon';
import Bookmark from '../newcomps/Bookmark';
import EmptyBookmark from '../newcomps/EmptyBookmark';
import ThreeDots from '../newcomps/ThreeDots';
import NavArrow from '../newcomps/NavArrow';
import Hourglass from '../newcomps/Hourglass';
import Add from '../newcomps/Add';
import InfoIcon from '../newcomps/InfoIcon';

export function FreeWriteScreen() {
    const [text, setText] = useState('');
    const [title, setTitle] = useState('');
    const [inspireVisible, setInspireVisible] = useState(false);
    const inspireWords = ['remedy', 'technology', 'uniform'];

    return (
        <ScrollView contentContainerStyle={{ alignItems: 'flex-start', paddingHorizontal: 16 }}>
            {/* Title Input */}
            <View style={{ marginBottom: 10, marginTop: 10 }}>
                <X placeholder="Insert Text Here" />
            </View>
            <View style={{ marginBottom: 10, marginTop: 10 }}>
                <SmallTextBox placeholder="Insert Text Here" />
            </View>
            <SearchBox placeholder="Search for..." style={styles.search} />
            <View style={{ marginBottom: 10, marginTop: 10 }}>
                <WordCard placeholder="Word Card Example" />
            </View>

            <View style={{ gap: 12, flexDirection: 'column', marginVertical: 10, alignItems: 'center'}}>
                <Button style={{ marginLeft: 10 }} onPress={() => alert('Files Viewed!')}>Can align as you wish</Button>
                <Button style={{alignSelf: 'flex-start'}} color="error" onPress={() => alert('cleared!')}>clear</Button>
                <Button color="red" onPress={() => alert('Deleted Succesfully! (Not really, this is just a pretend alert)')}>Delete User</Button>
                <Button icon={<CheckBoxIcon />} style={{ paddingVertical: 0, paddingTop: 2 }} onPress={() => alert('Voted!')}>Vote this Entry!</Button>
                <Button color="green" onPress={() => alert('green')}>Green</Button>
            </View>

            <SaveIcon />
            <FriendlyNotif />
            <RedNotif />
            <InProgressIcon />
            <CheckBoxIcon />
            <Bookmark />
            <EmptyBookmark />
            <ThreeDots />
            <NavArrow />
            <Hourglass />
            <Add />
            <InfoIcon />

            <TextInput
                multiline
                placeholder="Write your story here..."
                value={text}
                onChangeText={setText}
                className="text-base h-[300px] text-gray-800"
            />

            {inspireVisible && (
                <View className="bg-yellow-100 p-4 rounded-xl mb-4">
                    <Text className="text-sm text-gray-700 mb-2">Use these words for inspiration:</Text>
                    <View className="flex-row flex-wrap gap-2">
                        {inspireWords.map((word, i) => (
                            <Text key={i} className="bg-yellow-300 px-2 py-1 rounded-full text-sm text-gray-800">{word}</Text>
                        ))}
                    </View>
                </View>
            )}

            <View className="flex-row justify-between items-center mb-10">
                <TouchableOpacity
                    onPress={() => setInspireVisible(!inspireVisible)}
                    className="px-4 py-2 bg-yellow-400 rounded-full"
                >
                    <Text className="text-white font-semibold text-sm">Inspire Me</Text>
                </TouchableOpacity>
                <View className="flex-row gap-2">
                    <TouchableOpacity
                        className="px-4 py-2 border border-gray-300 rounded-full"
                        onPress={() => Alert.alert('Saved', 'Your story has been saved.')}
                    >
                        <Text className="text-sm">Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        className="px-4 py-2 bg-green-600 rounded-full"
                        onPress={() => Alert.alert('Published', 'Your story is now published!')}
                    >
                        <Text className="text-white font-semibold text-sm">Publish</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}

// ------------------------------
// 2. Daily Challenge Screen
// ------------------------------
export function ChallengeScreen() {
    const [text, setText] = useState('');
    const promptWords = ['significance', 'disaster', 'organization'];

    return (
        <View className="flex-1 bg-white p-4 pt-10">
            <Text className="text-lg font-medium mb-4">Write a short story inspired by these three words:</Text>
            <View className="flex-row flex-wrap gap-2 mb-4">
                {promptWords.map((word, i) => (
                    <Text key={i} className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm">{word}</Text>
                ))}
            </View>
            <TextInput
                multiline
                placeholder="Start writing your story..."
                value={text}
                onChangeText={setText}
                className="border border-gray-300 rounded-lg p-3 h-[300px] text-base"
            />
            <TouchableOpacity
                className="mt-4 bg-green-700 rounded-full py-3"
                onPress={() => Alert.alert('Saved', 'Your challenge entry was saved.')}
            >
                <Text className="text-white text-center font-semibold">Save</Text>
            </TouchableOpacity>
        </View>
    );
}

// ------------------------------
// 3. Collaborative Story Setup
// ------------------------------
export function CreateStoryScreen() {
    const [title, setTitle] = useState('');
    const [rounds, setRounds] = useState('3');
    const [wordLimit, setWordLimit] = useState('150');

    return (
        <View className="flex-1 bg-white px-4 pt-10">
            <Text className="text-2xl font-bold mb-4">Create a Collaborative Story</Text>
            <TextInput
                placeholder="Story Title"
                value={title}
                onChangeText={setTitle}
                className="border border-gray-300 rounded-xl px-4 py-3 mb-3"
            />
            <TextInput
                placeholder="Word Limit (e.g. 150)"
                value={wordLimit}
                onChangeText={setWordLimit}
                keyboardType="numeric"
                className="border border-gray-300 rounded-xl px-4 py-3 mb-3"
            />
            <TextInput
                placeholder="Number of Rounds"
                value={rounds}
                onChangeText={setRounds}
                keyboardType="numeric"
                className="border border-gray-300 rounded-xl px-4 py-3 mb-6"
            />
            <TouchableOpacity
                className="bg-green-700 rounded-full py-3"
                onPress={() => Alert.alert('Story Created', 'Your story session is ready!')}
            >
                <Text className="text-white text-center font-semibold">Create</Text>
            </TouchableOpacity>
        </View>
    );
}

// ------------------------------
// 4. Albums Screen
// ------------------------------
export function AlbumsScreen() {
    const folders = [
        { id: '1', name: 'Poetry' },
        { id: '2', name: 'Short Stories' },
        { id: '3', name: 'Daily Challenges' }
    ];

    return (
        <View className="flex-1 bg-white px-4 pt-10">
            <Text className="text-2xl font-bold mb-4">Your Albums</Text>
            <FlatList
                data={folders}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity className="mb-3 p-4 border border-gray-300 rounded-xl">
                        <Text className="text-lg font-medium text-gray-800">{item.name}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

// ------------------------------
// 5. Friends Management Screen
// ------------------------------
export function FriendsScreen() {
    const [friends, setFriends] = useState([
        { id: '1', name: 'Alex' },
        { id: '2', name: 'Morgan' },
        { id: '3', name: 'Jamie' }
    ]);

    return (
        <View className="flex-1 bg-white px-4 pt-10">
            <Text className="text-2xl font-bold mb-4">Your Friends</Text>
            <FlatList
                data={friends}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View className="mb-3 p-4 border border-gray-300 rounded-xl flex-row justify-between items-center">
                        <Text className="text-lg text-gray-800">{item.name}</Text>
                        <TouchableOpacity className="px-3 py-1 bg-red-500 rounded-full">
                            <Text className="text-white text-sm">Remove</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}


const styles = StyleSheet.create({
    search: {
        marginLeft: '5%',
        marginRight: '5%',
        marginTop: 8,
        marginBottom: 20
    }
});