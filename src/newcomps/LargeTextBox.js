// LargeTextBox.js
import React from 'react';
import { View, StyleSheet, Platform, Dimensions, TextInput } from 'react-native';
import Svg, { Rect } from 'react-native-svg';

const LargeTextBox = ({ placeholder = "Enter text..." }) => {
  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={styles.outerContainer}>
      <View style={[styles.shadowWrapper, { width: screenWidth - 20, height: 304 }]}> 
        <View style={styles.wrapper}>
          <Svg
            width={screenWidth - 20}
            height={304}
            viewBox={`0 0 ${screenWidth - 20} 304`}
            fill="none"
            style={StyleSheet.absoluteFill}
          >
            <Rect
              x="0.5"
              y="0.5"
              width={screenWidth - 21}
              height={303}
              rx="10"
              fill="white"
              stroke="#D9D9D9"
            />
          </Svg>
          <TextInput
            placeholder={placeholder}
            placeholderTextColor="#D9D9D9"
            multiline
            style={styles.input}
          />
        </View>
      </View>
    </View>
  );
};

export default LargeTextBox;

const styles = StyleSheet.create({
  outerContainer: {
    paddingHorizontal: 10,
  },
  shadowWrapper: {
    borderRadius: 10,
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
    flex: 1,
    padding: 10,
    justifyContent: 'flex-start',
    backgroundColor: 'transparent',
  },
  input: {
    flex: 1,
    fontSize: 20,
    color: '#000',
    textAlignVertical: 'top',
    fontFamily: 'CrimsonText-Regular',
    fontWeight: '400',
  },
});
