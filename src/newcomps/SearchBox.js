import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Platform,
  Dimensions,
} from 'react-native';
import Svg, { Rect, Circle } from 'react-native-svg';

const SearchBox = ({ placeholder = 'Search...' }) => {
  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={styles.outer}>
      <View style={[styles.shadowWrapper, { width: screenWidth - 20 }]}>
        <View style={styles.container}>
          <View style={styles.iconWrapper}>
            <Svg width={32} height={32} viewBox="0 0 32 32" fill="none">
              <Rect
                x="23.7071"
                y="25.1213"
                width="2"
                height="9"
                transform="rotate(-45 23.7071 25.1213)"
                fill="#FFD427"
                stroke="#FFD427"
              />
              <Circle
                cx="18.5"
                cy="18.5"
                r="8"
                fill="white"
                stroke="#FFD427"
              />
            </Svg>
          </View>
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

export default SearchBox;

const styles = StyleSheet.create({
  outer: {
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
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: '#CACACA',
    borderWidth: 1,
    borderRadius: 10,
    height: 42,
    paddingHorizontal: 4,
  },
  iconWrapper: {
    paddingBottom: 6, // lowers the icon
    paddingRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 20,
    paddingTop: 4, // pushes text down slightly
    fontFamily: 'CrimsonText-Regular',
    fontWeight: '400',
    color: '#D9D9D9',
  },
});
