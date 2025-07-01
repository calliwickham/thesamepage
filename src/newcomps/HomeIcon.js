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

const HomeIcon = ({ width = 36, height = 34 }) => (
  <Svg width={width} height={height} viewBox="0 0 36 34" fill="none" xmlns="http://www.w3.org/2000/svg">
    <G filter="url(#filter0_d)">
      <Rect x="5.75258" y="13.4227" width="24.2887" height="17.5773" fill="#FFF4E2" />
      <Path
        d="M17.2629 0.558855C17.6252 0.239471 18.1686 0.239471 18.5309 0.558855L31.4925 11.9844C32.1553 12.5686 31.7421 13.6624 30.8585 13.6624H4.9353C4.05174 13.6624 3.6385 12.5686 4.30131 11.9844L17.2629 0.558855Z"
        fill="#FFF4E2"
      />
      <Path
        d="M14.008 31C13.2386 24.0283 14.008 19.4948 18.0673 19.4949C22.1266 19.4949 22.6136 24.6722 22.2889 31H18.0673H14.008Z"
        fill="#073902"
      />
    </G>
    <Defs>
      <Filter
        id="filter0_d"
        x="2.69626"
        y="0.319336"
        width="30.4013"
        height="33.2374"
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
        <FeOffset dy="1.27835" />
        <FeGaussianBlur stdDeviation="0.639175" />
        <FeComposite in2="hardAlpha" operator="out" />
        <FeColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
        <FeBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
        <FeBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
      </Filter>
    </Defs>
  </Svg>
);

export default HomeIcon;
