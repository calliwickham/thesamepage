import React from 'react';
import Svg, { G, Path, Defs, Filter, FeFlood, FeColorMatrix, FeOffset, FeGaussianBlur, FeComposite, FeBlend } from 'react-native-svg';

const Add = () => {
  return (
    <Svg width="26" height="26" viewBox="0 0 26 26" fill="none">
      <G filter="url(#filter0_d_293_2404)">
        <Path
          d="M13.8457 10.1543H24V11.8457H13.8457V22H12.1543V11.8457H2V10.1543H12.1543V0H13.8457V10.1543Z"
          fill="#11460D"
        />
      </G>
      <Defs>
        <Filter
          id="filter0_d_293_2404"
          x="0"
          y="0"
          width="26"
          height="26"
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
          <FeGaussianBlur stdDeviation="1" />
          <FeComposite in2="hardAlpha" operator="out" />
          <FeColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <FeBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_293_2404" />
          <FeBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_293_2404" result="shape" />
        </Filter>
      </Defs>
    </Svg>
  );
};

export default Add;
