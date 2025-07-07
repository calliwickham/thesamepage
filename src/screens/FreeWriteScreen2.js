import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SaveIcon from '../newcomps/SaveIcon';
import UndoIcon from '../newcomps/Undo';

export default function FreeWriteScreen2() {
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [story, setStory] = useState('');
  const [prevTitle, setPrevTitle] = useState('');
  const [prevStory, setPrevStory] = useState('');

  const handleTitleChange = (text) => {
    setPrevTitle(title);
    setTitle(text);
  };

  const handleStoryChange = (text) => {
    setPrevStory(story);
    setStory(text);
  };

  const handleClear = () => {
    setPrevStory(story);
    setStory('');
  };

  const handleUndo = () => {
    setTitle(prevTitle);
    setStory(prevStory);
  };

  const handlePublish = () => {
    console.log('Publishing:', { title, story });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <Text style={styles.header}>Free Write</Text>
          <TouchableOpacity style={styles.inspireButton} onPress={() => navigation.navigate('FreeWriteInspireMe')}>
            <Text style={styles.inspireText}>Inspire Me</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.titleInput}
          placeholder="Title of Work"
          value={title}
          onChangeText={handleTitleChange}
          placeholderTextColor="#aaa"
        />

        <View style={styles.storyWrapper}>
          <ScrollView>
            <TextInput
              style={styles.storyInput}
              placeholder="Write your story"
              value={story}
              onChangeText={handleStoryChange}
              placeholderTextColor="#ccc"
              multiline
            />
          </ScrollView>
          <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
            <Text style={styles.clearText}>clear</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity>
            <SaveIcon />
          </TouchableOpacity>

          <TouchableOpacity style={styles.publishButton} onPress={handlePublish}>
            <Text style={styles.publishText}>Publish</Text>
          </TouchableOpacity>

          
<TouchableOpacity onPress={handleUndo}>
  <UndoIcon width={41} height={38} />
</TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e8efe2',
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  header: {
    fontSize: 32,
    fontFamily: 'Crimson Text',
    fontWeight: 'bold',
  },
  inspireButton: {
    backgroundColor: '#0B3D0B',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 4,
    elevation: 4,
  },
  inspireText: {
    fontSize: 18,
    fontFamily: 'Crimson Text',
    color: '#fff',
    fontWeight: '700',
  },
  titleInput: {
    backgroundColor: '#fff',
    borderRadius: 12,
    fontSize: 20,
    fontFamily: 'Crimson Text',
    padding: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  storyWrapper: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    flex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    marginBottom: 16,
    position: 'relative',
  },
  storyInput: {
    fontSize: 18,
    fontFamily: 'Crimson Text',
    textAlignVertical: 'top',
    minHeight: 300,
    paddingBottom: 40,
  },
  clearButton: {
    position: 'absolute',
    bottom: 10,
    right: 16,
    backgroundColor: '#fcdede',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  clearText: {
    color: 'red',
    fontFamily: 'Crimson Text',
    fontWeight: '600',
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  saveIcon: {
    fontSize: 36,
  },
  undoIcon: {
    fontSize: 36,
  },
  publishButton: {
    backgroundColor: '#FFD12D',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 36,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
    marginBottom: 10,
  },
  publishText: {
    fontSize: 20,
    fontFamily: 'Crimson Text',
    fontWeight: '700',
    color: '#000',
  },
});
