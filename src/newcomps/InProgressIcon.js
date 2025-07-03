// InProgressIcon.js
import React from 'react';
import Svg, { G, Circle, Path, Defs, Filter, FeFlood, FeColorMatrix, FeOffset, FeGaussianBlur, FeComposite, FeBlend, Mask } from 'react-native-svg';

const InProgressIcon = ({ width = 45, height = 40 }) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 45 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <G filter="url(#filter0_d_217_1254)">
        <Circle cx="26.5" cy="15.5" r="13" fill="white" stroke="#FFD427" strokeWidth="3" />
        <Mask id="mask0_217_1254" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="6" y="13" width="22" height="21">
          <Path d="M27.1476 13.7392L22.2363 33.971L6.39221 15.3701L27.1476 13.7392Z" fill="#D9D9D9" />
        </Mask>
        <G mask="url(#mask0_217_1254)">
          <Circle
            cx="26.5001"
            cy="15.5001"
            r="12.5"
            fill="white"
            stroke="#FFD427"
            strokeWidth="4"
            strokeDasharray="2 2"
          />
        </G>
        <Path d="M26 8V17L33 21.5" stroke="#FFD427" strokeWidth="2" />
      </G>
      <Defs>
        <Filter
          id="filter0_d_217_1254"
          x="-3.11111"
          y="0"
          width="48.1111"
          height="46.0536"
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
          <FeOffset dy="3" />
          <FeGaussianBlur stdDeviation="2" />
          <FeComposite in2="hardAlpha" operator="out" />
          <FeColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <FeBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_217_1254" />
          <FeBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_217_1254" result="shape" />
        </Filter>
      </Defs>
    </Svg>
  );
};

export default InProgressIcon;
