import React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';

export default function TileWithFoldedCorner({ children }) {
  const screenWidth = Dimensions.get('window').width;
  const tileWidth = screenWidth * 0.9; // 90% of screen width
  const tileHeight = tileWidth * 0.6;  // proportionally scaled

  return (
    <View style={styles.container}>
      <View style={[styles.tile, { width: tileWidth, height: tileHeight }]}>
        <Text style={styles.text}>{ children }</Text>
        {/* Peeled corner */}
        <View
          style={[
            styles.corner,
            {
              borderLeftWidth: tileWidth * 0.15,
              borderTopWidth: tileHeight * 0.15,
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tile: {
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 3, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    position: 'relative',
  },
  text: {
    margin: 16,
    fontSize: 16,
  },
  corner: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftColor: 'transparent',
    borderTopColor: '#eee', // The "peeled" color
  },
});
