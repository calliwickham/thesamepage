import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { G, Rect, Defs, Filter, FeFlood, FeColorMatrix, FeOffset, FeGaussianBlur, FeComposite, FeBlend } from 'react-native-svg';

const WordCard = ({ placeholder = 'Word' }) => {
  return (
    <View style={styles.container}>
      <Svg width="308" height="58" viewBox="0 0 308 58" fill="none">
        <G filter="url(#filter0_d_91_495)">
          <Rect x="4" width="300" height="50" fill="#0A4205" />
        </G>
        <Defs>
          <Filter id="filter0_d_91_495" x="0" y="0" width="308" height="58" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <FeFlood floodOpacity="0" result="BackgroundImageFix" />
            <FeColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 127 0" result="hardAlpha" />
            <FeOffset dy="4" />
            <FeGaussianBlur stdDeviation="2" />
            <FeComposite in2="hardAlpha" operator="out" />
            <FeColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.25 0" />
            <FeBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_91_495" />
            <FeBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_91_495" result="shape" />
          </Filter>
        </Defs>
      </Svg>
      <Text style={styles.text}>{placeholder}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 308,
    height: 58,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    position: 'absolute',
    color: '#FFF',
    fontFamily: 'CrimsonText-SemiBold',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '600',
    textAlign: 'center',
    paddingBottom: 8,
  },
});

export default WordCard;
