import React from 'react';
import Svg, { G, Path, Defs, Filter, FeOffset, FeGaussianBlur, FeColorMatrix, FeBlend } from 'react-native-svg';

const X = ({ size = 42 }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 42 42" fill="none">
      <G filter="url(#cleanShadow)">
        <Path
          d="M37.1123 5.53516L25.0908 17.5557L37.1123 29.5771L33.5771 33.1123L21.5557 21.0908L9.53516 33.1123L6 29.5771L18.0205 17.5557L6 5.53516L9.53516 2L21.5557 14.0205L33.5771 2L37.1123 5.53516Z"
          fill="#FF0000"
        />
      </G>
      <Defs>
        <Filter id="cleanShadow" x="-10%" y="-10%" width="120%" height="120%">
          <FeOffset result="offOut" in="SourceAlpha" dx="0" dy="2" />
          <FeGaussianBlur result="blurOut" in="offOut" stdDeviation="2" />
          <FeColorMatrix
            result="matrixOut"
            in="blurOut"
            type="matrix"
            values="
              0 0 0 0 0
              0 0 0 0 0
              0 0 0 0 0
              0 0 0 0.2 0
            "
          />
          <FeBlend in="SourceGraphic" in2="matrixOut" mode="normal" />
        </Filter>
      </Defs>
    </Svg>
  );
};

export default X;
