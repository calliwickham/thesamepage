import React from 'react';
import Svg, {
  Ellipse,
  Path,
  G,
  Defs,
  Filter,
  FeFlood,
  FeColorMatrix,
  FeOffset,
  FeGaussianBlur,
  FeComposite,
  FeBlend,
} from 'react-native-svg';

const FriendsIcon = ({ width = 41, height = 42 }) => (
  <Svg width={width} height={height} viewBox="0 0 41 42" fill="none" xmlns="http://www.w3.org/2000/svg">
    <G filter="url(#filter0_d)">
      <Ellipse cx="16.4225" cy="7.48491" rx="7.60562" ry="7.48491" fill="#FFD427" />
      <Path
        d="M4 31C5.78768 21.7985 2.63303 13.6527 16.5493 13.3481C30.4655 13.0435 27.9111 23.4188 28.7183 31H4Z"
        fill="#FFD427"
      />
    </G>
    <G filter="url(#filter1_d)">
      <Ellipse cx="24.4225" cy="10.4849" rx="7.60562" ry="7.48491" fill="#FFF4E2" />
      <Path
        d="M12 34C13.7877 24.7985 10.633 16.6527 24.5493 16.3481C38.4655 16.0435 35.9111 26.4188 36.7183 34H12Z"
        fill="#FFF4E2"
      />
    </G>
    <Defs>
      <Filter id="filter0_d" x="0" y="0" width="32.7183" height="39" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <FeFlood floodOpacity="0" result="BackgroundImageFix" />
        <FeColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <FeOffset dy="4" />
        <FeGaussianBlur stdDeviation="2" />
        <FeComposite in2="hardAlpha" operator="out" />
        <FeColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
        <FeBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
        <FeBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
      </Filter>
      <Filter id="filter1_d" x="8" y="3" width="32.7183" height="39" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <FeFlood floodOpacity="0" result="BackgroundImageFix" />
        <FeColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <FeOffset dy="4" />
        <FeGaussianBlur stdDeviation="2" />
        <FeComposite in2="hardAlpha" operator="out" />
        <FeColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
        <FeBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
        <FeBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
      </Filter>
    </Defs>
  </Svg>
);

export default FriendsIcon;
