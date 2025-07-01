import React from 'react';
import Svg, {
  G,
  Rect,
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

const AlbumIcon = ({ width = 41, height = 36 }) => (
  <Svg width={width} height={height} viewBox="0 0 41 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <G filter="url(#filter0_d)">
      <Rect x="3.00002" y="4.25488" width="35" height="26.7451" rx="3.03922" fill="#FFF4E2" />
    </G>
    <Path
      d="M25.1324 3.03922C25.1324 1.36071 26.4931 0 28.1716 0H32.3873C34.0658 0 35.4265 1.3607 35.4265 3.03922V4.2549H25.1324V3.03922Z"
      fill="#FFF4E2"
    />
    <Defs>
      <Filter
        id="filter0_d"
        x="0.568648"
        y="4.25488"
        width="39.8627"
        height="31.6079"
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
        <FeOffset dy="2.43137" />
        <FeGaussianBlur stdDeviation="1.21569" />
        <FeComposite in2="hardAlpha" operator="out" />
        <FeColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
        <FeBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
        <FeBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
      </Filter>
    </Defs>
  </Svg>
);

export default AlbumIcon;
