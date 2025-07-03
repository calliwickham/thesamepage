import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, {
  G,
  Path,
  Circle,
  Defs,
  Filter,
  FeFlood,
  FeColorMatrix,
  FeOffset,
  FeGaussianBlur,
  FeComposite,
  FeBlend,
} from 'react-native-svg';

const RedNotif = () => {
  return (
    <View style={styles.container}>
      <Svg width={32} height={32} viewBox="0 0 32 32" fill="none">
        <G filter="url(#filter0_d)">
          <Circle cx="14" cy="14" r="14" fill="#FF0004" />
        </G>
        <Path
          d="M10.8848 19V17.3203H11.8027C12.3431 17.3203 12.6621 17.2357 12.7598 17.0664C12.8574 16.8971 12.9062 16.6302 12.9062 16.2656V8.90234C12.5286 9.11068 12.1283 9.29297 11.7051 9.44922C11.2884 9.59896 10.9303 9.70312 10.6309 9.76172V7.79883C11.2754 7.69466 11.8613 7.5026 12.3887 7.22266C12.9225 6.9362 13.3717 6.60417 13.7363 6.22656H15.6016V16.2852C15.6016 16.5651 15.6211 16.7799 15.6602 16.9297C15.7057 17.0794 15.8164 17.1836 15.9922 17.2422C16.1745 17.2943 16.4707 17.3203 16.8809 17.3203H17.5547V19C17.0664 19 16.5846 19 16.1094 19C15.6341 18.9935 15.0677 18.987 14.4102 18.9805C13.6419 18.9805 13.0039 18.9837 12.4961 18.9902C11.9883 18.9967 11.4512 19 10.8848 19Z"
          fill="white"
        />
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
