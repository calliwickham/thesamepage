
import Svg, { Path } from 'react-native-svg';

const YellowWarning = ({ width = 45, height = 40 }) => {
    return (
        <Svg
            width={width}
            height={height}
            viewBox="0 0 35 42"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <Path
                fill="#FFD427"
                stroke="#000"
                strokeWidth={2}
                d="M18.356 1c8.281 0 14.994 6.713 14.995 14.993 0 8.28-6.714 14.994-14.995 14.994-1.98 0-3.872-.385-5.603-1.084l-.004.005L2.428 38.66 7.12 25.968l.012-.034a14.937 14.937 0 0 1-3.77-9.94C3.363 7.712 10.076 1 18.356 1Z"
            />
            <Path
                fill="#fff"
                stroke="#000"
                d="M18.513 21.813c.666 0 1.266.158 1.663.597.341.369.524.811.524 1.309 0 .51-.177.965-.523 1.34-.398.43-1 .582-1.664.582-.662 0-1.266-.152-1.655-.59v-.001a1.958 1.958 0 0 1-.517-1.331c0-.498.188-.938.533-1.302l.076-.08c.392-.38.949-.524 1.563-.524Zm1.765-14.938c0 .09-.017.447-.047 1.041v.009a192.7 192.7 0 0 0-.14 2.275c-.053.907-.11 1.867-.173 2.878l-.187 2.894-.157 2.265v.001c-.04.58-.068.939-.082 1.035l-.061.43h-1.977l-.061-.43a28.006 28.006 0 0 1-.082-1.035c-.026-.302-.054-.641-.082-1.016l-.09-1.25a673.852 673.852 0 0 1-.36-5.766l-.081-1.257c-.024-.375-.044-.712-.06-1.009l-.046-.71a7.864 7.864 0 0 1-.017-.34V5.376c0-.168.002-.301.004-.397.002-.048.004-.092.007-.128.002-.018.003-.042.007-.067 0-.007.011-.083.05-.163l.14-.276h3.48v.532c.002.024.002.058.004.102l.012.381v1.516Z"
            />
        </Svg>
    );
};

export default YellowWarning;
