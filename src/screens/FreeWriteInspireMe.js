import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import UndoIcon from '../newcomps/Undo'; // Your custom arrow icon
import { generateThreeWords } from '../utils/wordPool';

export default function FreeWriteInspireMe() {
  const navigation = useNavigation();

  const [inspirationalWords, setInspirationalWords] = useState(generateThreeWords());

  const handleRefresh = () => {
    setInspirationalWords(generateThreeWords());
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Text style={styles.header}>Free Write</Text>
        {/* 
        <TouchableOpacity style={styles.inspireButton}>
          <Text style={styles.inspireText}>Inspire Me</Text>
        </TouchableOpacity>*/}
      </View>

      {/* Speech Bubble with Triangle */}
      <View style={styles.speechBubbleWrapper}>
        <View style={styles.triangle} />
        <View style={styles.speechBubble}>
          <View style={styles.topRow}>
            <Text style={styles.promptText}>Use these words to inspire your story...</Text>
            <TouchableOpacity onPress={handleRefresh}>
              <UndoIcon width={32} height={32} />
            </TouchableOpacity>
          </View>

          {inspirationalWords.map((word, index) => (
            <TouchableOpacity key={index} style={styles.wordButton}>
              <Text style={styles.wordText}>{word}</Text>
            </TouchableOpacity>
          ))}

          {/* Go Back to Writing Button */}
          <TouchableOpacity
            style={styles.returnButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.returnText}>Return to Writing</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8efe2',
    padding: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    fontFamily: 'Crimson Text',
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
  speechBubbleWrapper: {
    alignItems: 'center',
    marginTop: 12,
  },
  triangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 20,
    borderRightWidth: 20,
    borderBottomWidth: 20,
    borderStyle: 'solid',
    backgroundColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#FFF4E2',
    alignSelf: 'flex-end',
    marginRight: 32,
    marginBottom: -1,
  },
  speechBubble: {
    backgroundColor: '#FFF4E2',
    padding: 20,
    borderRadius: 16,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 6,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  promptText: {
    fontSize: 20,
    fontFamily: 'Crimson Text',
    fontWeight: '600',
    flex: 1,
  },
  wordButton: {
    backgroundColor: '#0B3D0B',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginVertical: 6,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  wordText: {
    fontSize: 20,
    fontFamily: 'Crimson Text',
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
  returnButton: {
    marginTop: 20,
    backgroundColor: '#FFD12D',
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: 'center',
    elevation: 4,
  },
  returnText: {
    fontSize: 18,
    fontFamily: 'Crimson Text',
    fontWeight: '700',
    color: '#000',
  },
});
