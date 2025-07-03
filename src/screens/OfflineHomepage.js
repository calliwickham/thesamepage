import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BlurView } from 'expo-blur';

import InProgressIcon from '../newcomps/InProgressIcon';
import CheckBoxIcon from '../newcomps/CheckBoxIcon';
import YellowNotif from '../newcomps/YellowNotif';
import CalendarIcon from '../newcomps/CalendarIcon';
import SinglePage from '../newcomps/SinglePage';
import Puzzle from '../newcomps/Puzzle';

export default function OfflineHomepage() {
  const navigation = useNavigation();

  const Card = ({ backgroundColor, icon, title, text, notif, inProgress, isBlurred }) => {
    const CardContent = (
      <>
        <View style={styles.circle}>{icon}</View>
        <View style={styles.textContainer}>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardText}>{text}</Text>
        </View>
        {notif && <View style={styles.topRight}><YellowNotif /></View>}
        {inProgress && <View style={styles.topRight}><InProgressIcon /></View>}
        {title === "Daily Challenge" && (
          <View style={styles.bottomRight}><CheckBoxIcon /></View>
        )}
      </>
    );

    return isBlurred ? (
      <BlurView intensity={25} tint="light" style={[styles.card, { backgroundColor }]}>
        {CardContent}
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>
            To access Collaborative Mode, you{'\n'}
            must have an <Text style={{ fontWeight: 'bold' }}>Online Account</Text>. You may{'\n'}
            update your account type in Settings.
          </Text>
        </View>
      </BlurView>
    ) : (
      <TouchableOpacity onPress={() => navigation.navigate('FreeWrite')}>
        <View style={[styles.card, { backgroundColor }]}>
          {CardContent}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.welcome}>Welcome, Anastasia</Text>

        <Card
          backgroundColor="#FFF1DC"
          icon={<CalendarIcon width={40} height={40} />}
          title="Daily Challenge"
          text="Get a fresh prompt to inspire you"
          notif
        />

        <Card
          backgroundColor="#E4E4E4"
          icon={<SinglePage width={40} height={40} />}
          title="Free Write"
          text="Let your thoughts run wild on the page"
        />

        <Card
          backgroundColor="#E9F0E6"
          icon={
            <View style={{ transform: [{ translateX: -3 }, { translateY: -2 }] }}>
              <Puzzle width={40} height={40} />
            </View>
          }
          title="Collaborative Mode"
          text="Weave a story together with new friends"
          inProgress
          isBlurred
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 100,
  },
  welcome: {
    fontSize: 38,
    fontWeight: '700',
    marginBottom: 20,
    fontFamily: 'Crimson Text',
  },
  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 26,
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 120,
    position: 'relative',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  circle: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: '700',
    fontFamily: 'Crimson Text',
    marginBottom: 4,
  },
  cardText: {
    fontSize: 18,
    fontFamily: 'Crimson Text',
  },
  topRight: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  bottomRight: {
    position: 'absolute',
    bottom: 8,
    right: 8,
  },
  errorBox: {
    position: 'absolute',
    top: '50%',
    left: '5%',
    right: '5%',
    backgroundColor: '#FFECEC',
    borderRadius: 12,
    padding: 12,
    transform: [{ translateY: -30 }],
    elevation: 3,
  },
  errorText: {
    color: '#F00',
    textAlign: 'center',
    fontFamily: 'Crimson Text',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 22,
  },
});
