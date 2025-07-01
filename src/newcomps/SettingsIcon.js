import React from 'react';
import Svg, {
  G,
  Circle,
  Rect,
  Defs,
  Filter,
  FeFlood,
  FeColorMatrix,
  FeOffset,
  FeGaussianBlur,
  FeComposite,
  FeBlend,
} from 'react-native-svg';

const SettingsIcon = ({ width = 39, height = 39 }) => (
  <Svg width={width} height={height} viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
    <G filter="url(#filter0_d_504_57)">
      <Circle cx="19.437" cy="15.437" r="10.3963" fill="#FFF4E2" />
      <Rect x="24.4146" y="24.3353" width="5.54472" height="5.54472" transform="rotate(-45 24.4146 24.3353)" fill="#FFF4E2" />
      <Rect x="16.7276" y="25.4553" width="5.54472" height="5.54472" fill="#FFF4E2" />
      <Rect x="6.77235" y="6.69305" width="5.54472" height="5.54472" transform="rotate(-45 6.77235 6.69305)" fill="#FFF4E2" />
      <Rect x="16.7276" width="5.54472" height="5.54472" fill="#FFF4E2" />
      <Rect x="6.77235" y="24.3353" width="5.54472" height="5.54472" transform="rotate(-45 6.77235 24.3353)" fill="#FFF4E2" />
      <Rect x="24.4146" y="6.69305" width="5.54472" height="5.54472" transform="rotate(-45 24.4146 6.69305)" fill="#FFF4E2" />
      <Rect x="4" y="12.7277" width="5.54472" height="5.54472" fill="#FFF4E2" />
      <Rect x="29.4553" y="12.7277" width="5.54472" height="5.54472" fill="#FFF4E2" />
      <Circle cx="19.5" cy="15.5" r="6.30081" fill="#073902" />
    </G>
    <Defs>
      <Filter id="filter0_d_504_57" x="0" y="0" width="39" height="39" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <FeFlood floodOpacity="0" result="BackgroundImageFix" />
        <FeColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <FeOffset dy="4" />
        <FeGaussianBlur stdDeviation="2" />
        <FeComposite in2="hardAlpha" operator="out" />
        <FeColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
        <FeBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_504_57" />
        <FeBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_504_57" result="shape" />
      </Filter>
    </Defs>
  </Svg>
);

export default SettingsIcon;
