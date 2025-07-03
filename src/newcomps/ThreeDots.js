// ThreeDots.js
import React from 'react';
import Svg, { Rect, Circle, Path } from 'react-native-svg';

const ThreeDots = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Rect width="24" height="24" fill="white" />
    <Circle cx="12" cy="4" r="2" fill="#011565" />
    <Circle cx="12" cy="12" r="2" fill="#011565" />
    <Path
      d="M14 20C14 21.1046 13.1046 22 12 22C10.8954 22 10 21.1046 10 20C10 18.8954 10.8954 18 12 18C13.1046 18 14 18.8954 14 20Z"
      fill="#011565"
    />
  </Svg>
);

export default ThreeDots;
