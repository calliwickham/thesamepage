// Modernized Screens from The Same Page App
// Using React Native + Tailwind + Functional Components

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, FlatList } from 'react-native';

// ------------------------------
// 1. Free Write Screen
// ------------------------------
import LargeTextBox from '../newcomps/LargeTextBox'; // adjust path if needed
import SmallTextBox from '../newcomps/SmallTextBox';
import SearchBox from '../newcomps/SearchBox';

export function FreeWriteScreen() {
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [inspireVisible, setInspireVisible] = useState(false);
  const inspireWords = ['remedy', 'technology', 'uniform'];

  return (
    <View className="flex-1 bg-white px-4 pt-10">
      {/* Title Input */}
      <View style={{ marginBottom: 10, marginTop: 10 }}>
        <LargeTextBox placeholder="Insert Text Here" />
      </View>
      <View style={{ marginBottom: 10, marginTop: 10 }}>
        <SmallTextBox placeholder="Insert Text Here" />
      </View>
      <View style={{ marginBottom: 10, marginTop: 10 }}>
        <SearchBox placeholder="Search Here..." />
      </View>

      <ScrollView className="flex-1 mb-4">
        <TextInput
          multiline
          placeholder="Write your story here..."
          value={text}
          onChangeText={setText}
          className="text-base h-[300px] text-gray-800"
        />
      </ScrollView>

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

      <View className="flex-row justify-between items-center">
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
    </View>
  );}

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