import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function GreenX({ width = 13, height = 15 }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M2.69762 0.454545L6.44762 6.50568H6.56126L10.3113 0.454545H12.3851L7.81126 7.72727L12.3851 15H10.3113L6.56126 9.0625H6.44762L2.69762 15H0.623757L5.31126 7.72727L0.623757 0.454545H2.69762Z"
        fill="#009F00" // Green fill
      />
    </Svg>
  );
}
