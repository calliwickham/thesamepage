import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const NavArrow = () => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
        <Path
          d="M16 4L8 12L16 20"
          stroke="#073902"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
      <Text
        style={{
          marginLeft: 2,
          color: '#073902',
          fontFamily: 'Crimson Text',
          fontSize: 24,
          fontWeight: '600',
        }}
      >
        Back
      </Text>
    </View>
  );
};

export default NavArrow;
