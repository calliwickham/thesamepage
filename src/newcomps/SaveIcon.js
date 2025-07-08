import React from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import Svg, { G, Path, Line, Defs, Filter, FeFlood, FeColorMatrix, FeOffset, FeGaussianBlur, FeComposite, FeBlend } from 'react-native-svg';

const SaveIcon = () => {


    return (
        <Svg width="43" height="43" viewBox="0 0 43 43" fill="none">
            <G filter="url(#filter0_d_200_643)">
                <Path d="M40 6.17285V34C40 35.6569 38.6569 37 37 37H8C6.34315 37 5 35.6569 5 34V5C5 3.34315 6.34315 2 8 2H35.3643L40 6.17285Z" fill="#730000" />
                <Path d="M10.339 20.017C10.339 18.9124 11.2344 18.017 12.339 18.017H33.2542C34.3588 18.017 35.2542 18.9124 35.2542 20.017V37H10.339V20.017Z" fill="#E4E4E4" />
                <Line x1="15.0847" y1="22.856" x2="29.9153" y2="22.856" stroke="black" />
                <Line x1="15.0847" y1="27.6017" x2="29.9153" y2="27.6017" stroke="black" />
                <Line x1="15.0847" y1="32.3475" x2="29.9153" y2="32.3475" stroke="black" />
                <Path d="M33.4746 13.8643H11.5254V2H33.4746V13.8643ZM26.3555 4.37305V11.4912H29.9151V4.37305H26.3555Z" fill="black" />
            </G>
            <Defs>
                <Filter id="filter0_d_200_643" x="0" y="0" width="43" height="43" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <FeFlood floodOpacity="0" result="BackgroundImageFix" />
                    <FeColorMatrix in="SourceAlpha" type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <FeOffset dx="-1" dy="2" />
                    <FeGaussianBlur stdDeviation="2" />
                    <FeComposite in2="hardAlpha" operator="out" />
                    <FeColorMatrix type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                    <FeBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_200_643" />
                    <FeBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_200_643" result="shape" />
                </Filter>
            </Defs>
        </Svg>
    );
};

export default SaveIcon;
