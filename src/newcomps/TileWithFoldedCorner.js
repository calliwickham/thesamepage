import React from "react";
import Svg, { Path } from "react-native-svg";
import { View, StyleSheet } from "react-native";

const TileWithFoldedCorner = ({ children, style, fill, line }) => {
    const svgWidth = 320;
    const svgHeight = 126;
    const shadow2_X = 3;
    const shadow2_Y = 5;

    const fullSvgWidth = svgWidth + shadow2_X;
    const fullSvgHeight = svgHeight + shadow2_Y;
    const viewBoxValue = `0 0 ${fullSvgWidth} ${fullSvgHeight}`;

    if (!fill){
        fill = "#ff0000";
    }
    if (!line){
        line = "#8b0000"
    }

    return (
        <View
            style={[styles.defaultFile, style]}
        >
            {/* Layer 1 - Background SVG */}
            <Svg
                viewBox={viewBoxValue}
                width="100%"
                height="100%"
                fill="none"
                preserveAspectRatio="none"
            >
                {/* drawn shadows */}
                <Path
                    fill="rgba(0, 0, 0, 0.1)"
                    transform="translate(1,2)"
                    d="M314 0a6 6 0 0 1 6 6v90.433L289.151 126H6a6 6 0 0 1-6-6V6a6 6 0 0 1 6-6h308Z"
                />
                <Path
                    fill="rgba(0,0,0,0.07)"
                    transform="translate(2,3)"
                    d="M314 0a6 6 0 0 1 6 6v90.433L289.151 126H6a6 6 0 0 1-6-6V6a6 6 0 0 1 6-6h308Z"
                />
                <Path
                    fill="rgba(0,0,0,0.05)"
                    transform="translate(3,4)"
                    d="M314 0a6 6 0 0 1 6 6v90.433L289.151 126H6a6 6 0 0 1-6-6V6a6 6 0 0 1 6-6h308Z"
                />
                <Path
                    fill="rgba(0,0,0,0.02)"
                    transform="translate(3,5)"
                    d="M314 0a6 6 0 0 1 6 6v90.433L289.151 126H6a6 6 0 0 1-6-6V6a6 6 0 0 1 6-6h308Z"
                />
                {/* The file */}
                <Path
                    fill={fill}
                    d="M314 0a6 6 0 0 1 6 6v90.433L289.151 126H6a6 6 0 0 1-6-6V6a6 6 0 0 1 6-6h308Z"
                />
            </Svg>

            {/* Layer 2 - Content */}
            <View
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    justifyContent: "flex-start",
                    alignItems: "center",
                }}
            >
                {children}
            </View>

            {/* Layer 3 - Corner Sticker */}
            <Svg
                viewBox={viewBoxValue}
                width="100%"
                height="100%"
                fill="none"
                preserveAspectRatio="none"
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                }}
            >
                <Path
                    transform="translate(285,96)"
                    fill={fill}
                    stroke={line}
                    d="M2.03 8.47C8.523 12.424 11.306 19.894 3.422 30l15.304-14.5L34.03 1l-32 7.47Z"
                />
            </Svg>
        </View>
    );
};

export default TileWithFoldedCorner;

const styles = StyleSheet.create({
    defaultFile: {
        position: "relative",
        width: "100%",
        height: 100
    }
});