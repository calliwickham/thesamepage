import React from 'react';
import Svg, { Path, G, Defs, Filter, FeFlood, FeColorMatrix, FeOffset, FeGaussianBlur, FeComposite, FeBlend } from 'react-native-svg';



const Shuffle = () => (
    <Svg
        width={39}
        height={40}
        viewBox="0 0 41 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <Defs>
            <Filter
                id="shuffleShadow"
                x="0"
                y="0"
                width="41"
                height="38"
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
                <FeBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow"
                />
                <FeBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow"
                    result="shape"
                />
            </Filter>
        </Defs>

        <G filter="url(#shuffleShadow)">
            <Path
                fill="#fff"
                d="M10.019 6.599 9.56 8.093c4.636-3.657 11.257-4.163 16.507-.783 6.626 4.266 8.556 13.108 4.31 19.748-4.213 6.59-12.925 8.534-19.534 4.391L13 28.077a10.23 10.23 0 0 0 14.017-3.185c3.055-4.778 1.665-11.142-3.103-14.213a10.23 10.23 0 0 0-12.12.764l1.924-.107 3.002 3.845-13.736.768L7.017 2.753l3.002 3.845Z"
            />
        </G>
    </Svg>
);


export default Shuffle;
