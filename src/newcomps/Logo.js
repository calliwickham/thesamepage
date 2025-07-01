import React from 'react';
import Svg, { G, Rect, Path, Defs, Filter, FeFlood, FeColorMatrix, FeOffset, FeGaussianBlur, FeComposite, FeBlend } from 'react-native-svg';

const Logo = (props) => (
  <Svg width={45} height={39} viewBox="0 0 45 39" fill="none" {...props}>
    <Defs>
      <Filter id="filter0_d" x="18.8211" y="9" width="25.4379" height="29.9464" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <FeFlood floodOpacity="0" />
        <FeColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
        <FeOffset dy="2.80494" />
        <FeGaussianBlur stdDeviation="1.40247" />
        <FeComposite in2="hardAlpha" operator="out" />
        <FeColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" />
        <FeBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow" />
        <FeBlend in="SourceGraphic" in2="effect1_dropShadow" mode="normal" result="shape" />
      </Filter>

      <Filter id="filter1_d" x="1.95806" y="7.6786" width="27.164" height="30.5892" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <FeFlood floodOpacity="0" />
        <FeColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
        <FeOffset dy="2.80494" />
        <FeGaussianBlur stdDeviation="1.40247" />
        <FeComposite in2="hardAlpha" operator="out" />
        <FeColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" />
        <FeBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow" />
        <FeBlend in="SourceGraphic" in2="effect1_dropShadow" mode="normal" result="shape" />
      </Filter>

      <Filter id="filter2_d" x="13.9175" y="4.06424" width="19.7165" height="26.7015" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <FeFlood floodOpacity="0" />
        <FeColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
        <FeOffset dy="2.80494" />
        <FeGaussianBlur stdDeviation="1.40247" />
        <FeComposite in2="hardAlpha" operator="out" />
        <FeColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" />
        <FeBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow" />
        <FeBlend in="SourceGraphic" in2="effect1_dropShadow" mode="normal" result="shape" />
      </Filter>
    </Defs>

    <G filter="url(#filter0_d)">
      <Rect x="28.1127" y="9" width="14.0247" height="21.0371" transform="rotate(17.9596 28.1127 9)" fill="#FFF4E2" />
    </G>
    <Path d="M29.626 13C32.126 15 36.126 12 38.626 15" stroke="black" strokeWidth={0.5} />
    <Path d="M24.626 28C27.126 30 31.126 27 33.626 30" stroke="black" strokeWidth={0.5} />
    <Path d="M25.626 25C28.126 27 32.126 24 34.626 27" stroke="black" strokeWidth={0.5} />
    <Path d="M26.626 22C29.126 24 33.126 21 35.626 24" stroke="black" strokeWidth={0.5} />
    <Path d="M27.626 19C30.126 21 34.126 18 36.626 21" stroke="black" strokeWidth={0.5} />
    <Path d="M28.626 16C31.126 18 35.126 15 37.626 18" stroke="black" strokeWidth={0.5} />

    <G filter="url(#filter1_d)">
      <Rect x="4.763" y="13.5601" width="14.0247" height="21.0371" transform="rotate(-24.7947 4.763 13.5601)" fill="#FFF4E2" />
    </G>
    <Path d="M8.5896 15.4699C11.783 15.2413 12.6835 10.323 16.5558 10.8287" stroke="black" strokeWidth={0.5} />
    <Path d="M15.1011 29.8782C18.2945 29.6496 19.195 24.7314 23.0672 25.2371" stroke="black" strokeWidth={0.5} />
    <Path d="M13.7988 26.9966C16.9922 26.768 17.8927 21.8497 21.7649 22.3554" stroke="black" strokeWidth={0.5} />
    <Path d="M12.4965 24.1149C15.6899 23.8863 16.5904 18.9681 20.4626 19.4737" stroke="black" strokeWidth={0.5} />
    <Path d="M11.1942 21.2332C14.3876 21.0046 15.2881 16.0864 19.1603 16.5921" stroke="black" strokeWidth={0.5} />
    <Path d="M9.89191 18.3515C13.0853 18.123 13.9858 13.2047 17.8581 13.7104" stroke="black" strokeWidth={0.5} />

    <G filter="url(#filter2_d)">
      <Rect x="16.8044" y="4.06424" width="14.0247" height="21.0371" transform="rotate(0.223357 16.8044 4.06424)" fill="#FFF4E2" />
    </G>
    <Path d="M19.4643 7.41312C22.4548 8.55647 25.3507 4.48052 28.6458 6.57634" stroke="black" strokeWidth={0.5} />
    <Path d="M19.2715 23.2233C22.262 24.3667 25.1579 20.2907 28.453 22.3866" stroke="black" strokeWidth={0.5} />
    <Path d="M19.3101 20.0613C22.3005 21.2046 25.1965 17.1287 28.4916 19.2245" stroke="black" strokeWidth={0.5} />
    <Path d="M19.3486 16.8992C22.3391 18.0426 25.235 13.9666 28.5301 16.0625" stroke="black" strokeWidth={0.5} />
    <Path d="M19.3872 13.7372C22.3776 14.8805 25.2736 10.8046 28.5687 12.9004" stroke="black" strokeWidth={0.5} />
    <Path d="M19.4258 10.5751C22.4162 11.7185 25.3122 7.64255 28.6073 9.73837" stroke="black" strokeWidth={0.5} />
  </Svg>
);

export default Logo;
