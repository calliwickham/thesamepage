import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, {
  G,
  Circle,
  Defs,
  Filter,
  FeFlood,
  FeColorMatrix,
  FeOffset,
  FeGaussianBlur,
  FeComposite,
  FeBlend,
  Text as SvgText,
} from 'react-native-svg';

const RedNotif = () => {
  return (
    <View style={styles.container}>
      <Svg width={32} height={32} viewBox="0 0 32 32" fill="none">
        <G filter="url(#filter0_d)">
          <Circle cx="14" cy="14" r="14" fill="#FF0004" />
        </G>
        <SvgText
          x="14"
          y="20"
          textAnchor="middle"
          fontSize="20"
          fill="white"
          fontWeight="500"
          fontFamily="CrimsonText-Bold"
        >
          !
        </SvgText>
        <Defs>
          <Filter
            id="filter0_d"
            x="0"
            y="0"
            width="32"
            height="32"
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
            <FeOffset dx="2" dy="2" />
            <FeGaussianBlur stdDeviation="1" />
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
    </View>
  );
};

export default RedNotif;

const styles = StyleSheet.create({
  container: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
