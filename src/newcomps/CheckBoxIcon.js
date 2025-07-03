// CheckBoxIcon.js
import React from 'react';
import Svg, { G, Path, Defs, Filter, FeFlood, FeColorMatrix, FeOffset, FeGaussianBlur, FeComposite, FeBlend } from 'react-native-svg';

const CheckBoxIcon = () => (
  <Svg width="35" height="34" viewBox="0 0 35 34" fill="none">
    <G filter="url(#filter0_d_217_1265)">
      <Path
        d="M13 24.8319L5 11.8318C7.66667 13.4985 11.8 19.0319 13 17.8319L13.0007 17.8312C14.5068 16.325 36.9987 -6.16683 28.5 3.33173C21.7 10.9317 14.3333 22.1652 13 24.8319Z"
        fill="#14EC00"
      />
      <Path
        d="M13 24.8319L5 11.8318C7.66667 13.4985 11.8 19.0319 13 17.8319L13.0007 17.8312C14.5068 16.325 36.9987 -6.16683 28.5 3.33173C21.7 10.9317 14.3333 22.1652 13 24.8319Z"
        stroke="#14EC00"
      />
    </G>
    <Defs>
      <Filter
        id="filter0_d_217_1265"
        x="0.574158"
        y="0.5"
        width="34.3383"
        height="33.3594"
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
        <FeOffset dy="4" />
        <FeGaussianBlur stdDeviation="2" />
        <FeComposite in2="hardAlpha" operator="out" />
        <FeColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
        />
        <FeBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_217_1265"
        />
        <FeBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_217_1265"
          result="shape"
        />
      </Filter>
    </Defs>
  </Svg>
);

export default CheckBoxIcon;
