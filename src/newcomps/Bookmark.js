// Bookmark.js
import React from 'react';
import Svg, {
  G,
  Path,
  Defs,
  Filter,
  FeFlood,
  FeColorMatrix,
  FeOffset,
  FeGaussianBlur,
  FeComposite,
  FeBlend,
} from 'react-native-svg';

const Bookmark = () => (
  <Svg width="31" height="44" viewBox="0 0 31 44" fill="none">
    <G filter="url(#filter0_d_247_2178)">
      <Path
        d="M26.6191 35.999L15.6191 25.0059L4.61914 35.999V0H26.6191V35.999Z"
        fill="#730000"
      />
      <Path
        d="M15.7456 1.30908L17.9494 8.09316H25.0811L19.3115 12.2859L21.5153 19.07L15.7456 14.8772L9.97604 19.07L12.1798 12.2859L6.41023 8.09316H13.5419L15.7456 1.30908Z"
        fill="#FFD427"
      />
    </G>
    <Defs>
      <Filter
        id="filter0_d_247_2178"
        x="0.619141"
        y="0"
        width="30"
        height="44"
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
          result="effect1_dropShadow_247_2178"
        />
        <FeBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_247_2178"
          result="shape"
        />
      </Filter>
    </Defs>
  </Svg>
);

export default Bookmark;
