import React from "react";
import Svg, { Path, G, Defs, Filter, FeFlood, FeColorMatrix, FeOffset, FeGaussianBlur, FeComposite, FeBlend } from 'react-native-svg';

import { View, StyleSheet } from "react-native";

const SpeechBubble = ({ children, style, contentContainerStyle }) => {

    const viewBoxValue = `0 0 336 422`;

    return (
        <View
            style={[styles.defaultLayout, style]}
        >
            {/* Layer 1 - Background SVG */}
            <Svg
                viewBox={viewBoxValue}
                width="100%"
                height="100%"
                fill="none"
                preserveAspectRatio="none"
            >
                <Defs>
                    <Filter
                        id="filter0_d_735_407"
                        x="0"
                        y="0.37793"
                        width="336"
                        height="421.622"
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
                        <FeGaussianBlur stdDeviation="4" />
                        <FeComposite in2="hardAlpha" operator="out" />
                        <FeColorMatrix
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.35 0"
                        />
                        <FeBlend
                            mode="normal"
                            in2="BackgroundImageFix"
                            result="effect1_dropShadow_735_407"
                        />
                        <FeBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="effect1_dropShadow_735_407"
                            result="shape"
                        />
                    </Filter>
                </Defs>

                <G filter="url(#filter0_d_735_407)">
                    <Path
                        d="M255.315 72H312C320.837 72 328 79.1634 328 88V396C328 404.837 320.837 412 312 412H24C15.1634 412 8 404.837 8 396V88C8 79.1634 15.1634 72 24 72H208.894L281.566 6.37793L255.315 72Z"
                        fill="#FFF4E2"
                    />
                </G>
            </Svg>

            {/* Layer 2 - Content */}
            <View
                style={[{
                    position: "absolute",
                    bottom: 10,
                    width: "95%",
                    height: "81%",
                    alignItems: "center",
                    alignSelf: "center",
                    //borderColor: "blue",
                    //borderStyle: "dotted",
                    //borderWidth: 1
                }, contentContainerStyle]}
            >
                {children}
            </View>
        </View>
    );
};

export default SpeechBubble;

const styles = StyleSheet.create({
    defaultLayout: {
        position: "relative",
        width: "100%",
        height: 400,
        alignSelf: 'center',
    }
});