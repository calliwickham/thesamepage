// src/components/AppIconExample.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import AppIcon from '../../assets/icons/AppIcon.svg'; // path to your SVG

export default function AppIconExample() {
  return (
    <View style={styles.container}>
      <AppIcon width={100} height={100} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
