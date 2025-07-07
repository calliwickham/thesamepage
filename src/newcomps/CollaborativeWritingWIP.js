import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function CollaborativeWritingWIP() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Collaborative Writing</Text>

      {/* Tabs */}
      <View style={styles.tabs}>
        <Text style={[styles.tab, styles.activeTab]}>My Sessions</Text>
        <Text style={[styles.tab, styles.disabledTab]}>Open Sessions</Text>
      </View>

      {/* WIP Message Box */}
      <View style={styles.messageBox}>
        <Text style={styles.wipTitle}>This Feature is Coming Soon!</Text>
        <Text style={styles.wipSubtitle}>
          We're still working on Collaborative Writing.{'\n'}Please check back in a future update.
        </Text>
      </View>

      {/* Disabled Button */}
      <TouchableOpacity style={styles.disabledButton} disabled>
        <Text style={styles.buttonText}>Create New Story</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 48,
    paddingHorizontal: 24,
  },
  headerBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#10471B',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Dancing Script',
  },
  icon: {
    fontSize: 22,
    color: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    fontFamily: 'Crimson Text',
    marginBottom: 20,
  },
  tabs: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    fontSize: 20,
    paddingBottom: 6,
    borderBottomWidth: 2,
    textAlign: 'center',
    fontFamily: 'Crimson Text',
  },
  activeTab: {
    borderColor: '#10471B',
    color: '#10471B',
    fontWeight: 'bold',
  },
  disabledTab: {
    borderColor: '#ccc',
    color: '#ccc',
  },
  messageBox: {
    backgroundColor: '#E8EFE2',
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
  },
  wipTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    fontFamily: 'Crimson Text',
    marginBottom: 8,
    textAlign: 'center',
  },
  wipSubtitle: {
    fontSize: 16,
    fontFamily: 'Crimson Text',
    textAlign: 'center',
    color: '#555',
  },
  disabledButton: {
    backgroundColor: '#FFD12D',
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    marginTop: 'auto',
    marginBottom: 24,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Crimson Text',
    color: '#000',
  },
});
