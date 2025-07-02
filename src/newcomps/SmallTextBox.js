import React from 'react';
import { View, TextInput, StyleSheet, Platform, Dimensions } from 'react-native';
import Svg, { Rect } from 'react-native-svg';

const SmallTextBox = ({ placeholder = "Enter text..." }) => {
  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={styles.outerContainer}>
      <View style={[styles.shadowWrapper, { width: screenWidth - 20 }]}>
        <View style={styles.wrapper}>
          <Svg
            width={screenWidth - 20}
            height={42}
            viewBox={`0 0 ${screenWidth - 20} 42`}
            fill="none"
            style={StyleSheet.absoluteFill}
          >
            <Rect
              x="0.5"
              y="0.5"
              width={screenWidth - 21}
              height="41"
              rx="9.5"
              fill="white"
              stroke="#CACACA"
            />
          </Svg>
          <TextInput
            placeholder={placeholder}
            placeholderTextColor="#D9D9D9"
            style={styles.input}
          />
        </View>
      </View>
    </View>
  );
};

export default SmallTextBox;

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
    height: 42,
    justifyContent: 'center',
    paddingHorizontal: 10,
    backgroundColor: 'transparent',
  },
  input: {
    flex: 1,
    fontSize: 20,
    color: '#D9D9D9',
    fontFamily: 'CrimsonText-Regular',
    fontWeight: '400',
  },
});
