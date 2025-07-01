import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { Dimensions, View, Text } from "react-native"

/**
 * @param {children} the content between the Component that will be rendered as it's own min-page on the tile, anchored to the top of the file vector image.
 * @param {children} need to be scaled externally. Children are rendered in a View anchored to the top center of the vector, scaling children will avoid corner below
 * @param {verticalStretch} a percentage (i.e. 1.1 or 0.9), stretches the component vertically. Also can work as shrink if < 1.
 * @param {shrink} a percentage <= 1, will make tile smaller and preserve aspect ratio.
 * @param {margin} in pixels, adds margin above and below the TileWithFoldedCorner, so if multiple TileWithFoldedCorners are rendered in a column, they'll have spacing between them.
 * verticalStretch
 */
const TileWithFoldedCorner = ({children, verticalStretch, shrink, margin}) => {

    /*original svg imported is 320 x 126
      calculations are for shadows and padding of box ONLY, 
      they are not for moving the corner or changing the height of the tile, 
      there may be options for that later
    */

    let svgWidth = 320; //DO NOT CHANGE
    let svgHeight = 126; //DO NOT CHANGE

    //translations
    let shadow1_X = 2;
    let shadow1_Y = 3;
    let shadow2_X = 4;
    let shadow2_Y = 6;

    svgWidth += shadow2_X;
    svgHeight += shadow2_Y;

    //percentage is the width of the component compared to the original screen
    if (shrink == undefined){
        shrink = 1;
    }
    //margin is the top-bottom padding between each tile
    if (margin == undefined){
        margin = 0;
    }

    //calculate size of svg
    const screenWidth = Dimensions.get('window').width;
    const tileWidth = screenWidth * shrink;
    let tileHeight = tileWidth * (svgHeight / svgWidth); // maintain the original aspect ratio

    //stretch tile for fun:
    if (verticalStretch != undefined){
        tileHeight *= verticalStretch;
    }

    //svg interpolated strings
    let viewBoxValue = `0 0 ${svgWidth} ${svgHeight}`
    let shadow1_transformValue = `translate(${shadow1_X},${shadow1_Y})`
    let shadow2_transformValue = `translate(${shadow2_X},${shadow2_Y})`

    return (
        <View style={{ width: tileWidth, height: tileHeight, marginVertical: margin, position: 'relative' }}>

            {/*layer 1 - File */}
            <Svg

                viewBox={viewBoxValue}
                width="100%"
                height="100%"
                fill="none"
                preserveAspectRatio="none"
            >
                <Path
                    fill="rgba(0, 0, 0, 0.04)"
                    transform={shadow1_transformValue}
                    d="M314 0a6 6 0 0 1 6 6v90.433L289.151 126H6a6 6 0 0 1-6-6V6a6 6 0 0 1 6-6h308Z"
                />
                <Path
                    fill="rgba(0,0,0,0.02)"
                    transform={shadow2_transformValue}
                    d="M314 0a6 6 0 0 1 6 6v90.433L289.151 126H6a6 6 0 0 1-6-6V6a6 6 0 0 1 6-6h308Z"
                />
                <Path
                    fill="#FFF4E2"
                    d="M314 0a6 6 0 0 1 6 6v90.433L289.151 126H6a6 6 0 0 1-6-6V6a6 6 0 0 1 6-6h308Z"
                />

            </Svg>

            {/* Layer 2: Content */}
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


            {/*layer 3 - corner curl */}
            <Svg

                viewBox={viewBoxValue}
                width="100%"
                height="100%"
                fill="none"
                preserveAspectRatio="none"
                style={{
                    position: "absolute", // <--- THIS makes it overlay
                    top: 0,
                    left: 0,
                }}
            >

                <Path
                    transform="translate(286,97)"
                    fill="#FFF4E2"
                    stroke="#FFD427"
                    d="M2.03 8.47C8.523 12.424 11.306 19.894 3.422 30l15.304-14.5L34.03 1l-32 7.47Z"
                />

            </Svg>

        </View>

    )
}

export default TileWithFoldedCorner

