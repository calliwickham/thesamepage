import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function GuestAccountPage() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.title}>Start As Guest?</Text>
        <View style={styles.divider} />

        <Text style={styles.text}>
          Your progress will be saved to this device only, and you won’t have access to the online friend feature.
        </Text>
        <Text style={styles.text}>
          If the app is uninstalled or the device is reset, your data may be lost.
        </Text>
        <Text style={styles.text}>
          You can switch to an online account later to back up your progress.
        </Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.goBack} onPress={() => navigation.goBack()}>
            <Text style={styles.goBackText}>← Go Back</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.continue}
            onPress={() => navigation.navigate('PennameScreen')}
          >
            <Text style={styles.continueText}>Continue As Guest</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 16,
  },
  box: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 6,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    fontFamily: 'Crimson Text',
    marginBottom: 12,
  },
  divider: {
    height: 1.5,
    backgroundColor: 'black',
    marginBottom: 16,
  },
  text: {
    fontSize: 18,
    fontFamily: 'Crimson Text',
    marginBottom: 14,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  goBack: {
    backgroundColor: '#114311',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  goBackText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Crimson Text',
    fontWeight: '600',
  },
  continue: {
    backgroundColor: '#FDD835',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  continueText: {
    color: 'black',
    fontSize: 20,
    fontFamily: 'Crimson Text',
    fontWeight: '600',
  },
});
