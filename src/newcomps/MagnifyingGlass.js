import React from 'react';
import Svg, { Rect, Circle } from 'react-native-svg';

const MagnifyingGlass = ({ width = 23, height = 23 }) => (
  <Svg width={width} height={height} viewBox="0 0 23 23" fill="none">
    <Rect
      x="13.7071"
      y="15.1213"
      width="2"
      height="9"
      transform="rotate(-45 13.7071 15.1213)"
      fill="#FFD427"
      stroke="#FFD427"
    />
    <Circle
      cx="8.5"
      cy="8.5"
      r="8"
      fill="white"
      stroke="#FFD427"
    />
  </Svg>
);

export default MagnifyingGlass;
