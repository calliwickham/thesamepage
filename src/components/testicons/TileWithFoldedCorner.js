import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { Dimensions, View } from "react-native"


const TileWithFoldedCorner = () => {

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
    let percentage = 0.9;
    //margin is the top-bottom padding between each tile
    let margin = 12;

    //calculate size of svg
    const screenWidth = Dimensions.get('window').width;
    const tileWidth = screenWidth * percentage;
    const tileHeight = tileWidth * (svgHeight / svgWidth); // maintain the original aspect ratio

    //svg interpolated strings
    let viewBoxValue = `0 0 ${tileWidth} ${tileHeight}`
    let shadow1_transformValue = `translate(${shadow1_X},${shadow1_Y})`
    let shadow2_transformValue = `translate(${shadow2_X},${shadow2_Y})`

    return (
        <View style={{ width: tileWidth, height: tileHeight, marginVertical: margin }}>

            <Svg

                viewBox={viewBoxValue}
                width="100%"
                height="100%"
                fill="none"
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

                <Path
                    transform="translate(285,96)"
                    fill="#FFF4E2"
                    stroke="#FFD427"
                    d="M2.03 8.47C8.523 12.424 11.306 19.894 3.422 30l15.304-14.5L34.03 1l-32 7.47Z"
                />

            </Svg>

        </View>

    )
}

export default TileWithFoldedCorner

