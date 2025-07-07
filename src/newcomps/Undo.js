import React from 'react';
import Svg, { Path, G, Defs, Filter, FeFlood, FeColorMatrix, FeOffset, FeGaussianBlur, FeComposite, FeBlend } from 'react-native-svg';

const UndoIcon = ({ width = 41, height = 38 }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 41 38" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Defs>
        <Filter
          id="filter0_d_223_1014"
          x="0"
          y="0.000305176"
          width="41.0002"
          height="38.0004"
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
          <FeOffset dx="1" dy="3" />
          <FeGaussianBlur stdDeviation="1.5" />
          <FeComposite in2="hardAlpha" operator="out" />
          <FeColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <FeBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_223_1014" />
          <FeBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_223_1014" result="shape" />
        </Filter>
      </Defs>
      <G filter="url(#filter0_d_223_1014)">
        <Path
          d="M17.5049 0.840547C22.533 -0.690165 29.2261 -0.283407 32.8682 3.34543C36.6392 7.10278 38.5952 11.6949 35.3828 19.6267C32.6677 26.3308 23.9225 31.08 22.7881 32.0007C25.1666 28.8894 28.8065 22.8031 29.7959 19.6267C31.0529 15.5911 30.0056 11.7541 28.1191 10.1638C24.4878 7.10263 21.2757 8.07643 18.9014 10.1638C18.232 10.7522 16.7322 12.4743 15.6094 13.9704L21.9336 18.445L4.54395 21.8054L2 4.34055L8.3877 8.86008C9.92441 5.99403 12.8908 2.24526 17.5049 0.840547Z"
          fill="#FFF4E2"
        />
      </G>
    </Svg>
  );
};

export default UndoIcon;
