import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Logo from './Logo'; // ensure path is correct

const Header = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>The Same Page</Text>
      <Logo width={50} height={50} />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingBottom: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#003300', // dark green
  },
  title: {
    color: '#FFF4E2',
    textAlign: 'center',
    fontFamily: 'Italianno', // ensure this font is loaded
    fontSize: 36,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 55, // optionally set a line height close to fontSize
  },
});
