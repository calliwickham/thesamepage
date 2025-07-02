import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Platform } from 'react-native';
import Svg, { Rect } from 'react-native-svg';
import { useFonts } from 'expo-font';

const GreenButton = ({ title = 'Click Me', onPress }) => {
  const screenWidth = Dimensions.get('window').width;
  return (
    <View style={styles.outerContainer}>
      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        <View style={[styles.shadowWrapper, { width: 120, height: 47 }]}>
          <View style={styles.wrapper}>
            <Svg
              width={120}
              height={47}
              viewBox="0 0 120 47"
              fill="none"
              style={StyleSheet.absoluteFill}
            >
              <Rect
                x="4"
                y="0"
                width="112"
                height="39"
                rx="19.5"
                fill="#0A4205"
              />
            </Svg>
            <Text style={styles.text}>{title}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default GreenButton;

const styles = StyleSheet.create({
  outerContainer: {
    paddingHorizontal: 10,
  },
  shadowWrapper: {
    borderRadius: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  wrapper: {
    height: 39,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: 'transparent',
  },
  text: {
    color: '#FFF4E2',
    textAlign: 'center',
    fontFamily: 'CrimsonText-SemiBold',
    fontSize: 20,
    fontWeight: '600',
    fontStyle: 'normal',
  },
});
