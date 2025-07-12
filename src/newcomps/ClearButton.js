import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, {
  Rect,
  G,
  Defs,
  Filter,
  FeFlood,
  FeColorMatrix,
  FeOffset,
  FeGaussianBlur,
  FeComposite,
  FeBlend,
} from 'react-native-svg';

const ClearButton = ({ label = 'clear' }) => {
  return (
    <View style={styles.container}>
      <Svg width={71} height={34} viewBox="0 0 71 34" fill="none" style={StyleSheet.absoluteFill}>
        <G filter="url(#filter0_d)">
          <Rect x="3" y="1" width="65" height="28" rx="14" fill="#FFDBDB" />
        </G>
        <Defs>
          <Filter
            id="filter0_d"
            x="0"
            y="0"
            width="71"
            height="34"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <FeFlood floodOpacity="0" result="BackgroundImageFix" />
            <FeColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <FeOffset dy="2" />
            <FeGaussianBlur stdDeviation="1.5" />
            <FeComposite in2="hardAlpha" operator="out" />
            <FeColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
            />
            <FeBlend in2="BackgroundImageFix" result="effect1_dropShadow" />
            <FeBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
          </Filter>
        </Defs>
      </Svg>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

export default ClearButton;

const styles = StyleSheet.create({
  container: {
    width: 71,
    height: 34,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    paddingBottom: 4,
    color: '#FF3D3D',
    textAlign: 'center',
    fontFamily: 'CrimsonText-Bold', // Update to match your actual file name
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: undefined,
  },
});
