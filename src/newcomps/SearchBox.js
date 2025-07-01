import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Svg, { Rect, Path, Circle } from 'react-native-svg';

const SearchBox = ({ placeholder = "Search..." }) => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#D9D9D9"
        style={styles.input}
      />
      <Svg
        width={32}
        height={32}
        viewBox="0 0 32 32"
        fill="none"
        style={styles.icon}
      >
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
  );
};

export default SearchBox;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#CACACA',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    backgroundColor: 'white',
    height: 42,
    width: 350,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  icon: {
    marginLeft: 8,
  },
});
