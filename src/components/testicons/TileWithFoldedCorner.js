import * as React from "react"
import Svg, { Path } from "react-native-svg"
const TileWithFoldedCorner = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        viewbox = "0 0 324 132"
        width= "100%"
        height= "100%"
        fill="none"
        {...props}
    >
        <Path
            fill="rgba(0, 0, 0, 0.04)"
            transform="translate(2,3)"
            d="M314 0a6 6 0 0 1 6 6v90.433L289.151 126H6a6 6 0 0 1-6-6V6a6 6 0 0 1 6-6h308Z"
        />
        <Path
            fill="rgba(0,0,0,0.02)"
            transform="translate(4,6)"
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
)
export default TileWithFoldedCorner

