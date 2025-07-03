import React from 'react';
import Svg, { Path } from 'react-native-svg';

const Hourglass = () => {
  return (
    <Svg width="15" height="24" viewBox="0 0 15 24" fill="none">
      <Path
        d="M13 21C14.1046 21 15 21.8954 15 23V24H0V23C3.22133e-08 21.8954 0.895431 21 2 21H13ZM15 1C15 2.10457 14.1046 3 13 3H2C0.895431 3 3.22133e-08 2.10457 0 1V0H15V1Z"
        fill="#6D4300"
      />
      <Path
        d="M13.5 3C13.5 9.82958 10.867 9.65594 8.76855 12C10.867 14.3441 13.5 14.1704 13.5 21H1.5C1.5 14.1708 4.30779 14.3436 6.3252 12C4.30779 9.65636 1.5 9.8292 1.5 3H13.5Z"
        fill="white"
      />
      <Path
        d="M12.5 5.5C11.8249 9.55059 9.58277 9.29865 8 11.2578V18.5771L10.0977 21H4.90234L7 18.5771V11.1865C5.56528 9.3047 3.38899 9.50045 2.5 5.5H12.5Z"
        fill="#FFD427"
      />
    </Svg>
  );
};

export default Hourglass;
