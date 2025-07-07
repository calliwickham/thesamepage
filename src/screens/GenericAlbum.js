import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

import FileCard from '../newcomps/FileCard.js';
import SearchBox from '../newcomps/SearchBox.js';
import { ALBUMSTHEMES } from '../constants/AlbumsThemes.js';

export default function GenericAlbum() {
  const route = useRoute();
  const navigation = useNavigation();
  const { albumKey } = route.params;
  const albumThemes = ALBUMSTHEMES;

  const dummyFiles = [
    {
      id: 1,
      album: 'freewrite',
      title: 'just learned how babies are made',
      date: '8/12/2023',
      wordcount: 475,
      text: `Dear Diary, \nIm traumatized. I’m having a little sister and I was sooooo curious how she was made so I lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque  faucibus ex sapien vitae pellentesque sem placerat.`,
    },
    {
      id: 2,
      album: 'freewrite',
      title: 'a very very long title, notice that this person didn’t finish their work',
      date: '8/12/2023',
      wordcount: 475,
      text: `Random stuff typing random stuff forever random stuff lorem ipsum dolor sit amet consectetur adipiscing elit.`,
    },
    {
      id: 3,
      album: 'collaborative',
      authors: 'Anatasia, Connor',
      title: 'The Ramen Noodle Shop',
      date: '7/2/2025',
      text: `The sun rose over the hill. \nSpot the dog wagged his tail.`,
      wordcount: 12,
    },
    {
      id: 4,
      album: 'daily',
      title: 'ostrich, speed, pavement',
      date: '6/3/2025',
      text: `An ostrich sped across the neighborhood...`,
      wordcount: 123,
    },
    {
      id: 5,
      album: 'freewrite',
      title: 'thoughts on leaves',
      date: '8/12/2023',
      wordcount: 475,
      text: `leaves can be crunchy or soft depending on the season...`,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>{albumThemes[albumKey].shortName} Files</Text>
      <SearchBox placeholder="Search for." style={styles.search} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {dummyFiles.map((file, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => navigation.navigate('FileViewer', { file })}
            activeOpacity={0.7}
          >
            <FileCard file={file} />
          </TouchableOpacity>
        ))}
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
    fontFamily: 'CrimsonText-BoldItalic',
    textAlign: 'center',
    marginVertical: 16,
    fontWeight: 'bold',
  },
  search: {
    marginHorizontal: '5%',
    marginBottom: 12,
  },
  scrollContainer: {
    paddingBottom: 6,
    paddingLeft: '5%',
    paddingRight: '5%',
  },
});
