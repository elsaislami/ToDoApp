import React from 'react';
import Svg, { Path } from 'react-native-svg';

const ProfileIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M12 12c2.67 0 8 1.34 8 4v2H4v-2c0-2.66 5.33-4 8-4z" />
    <Path d="M12 12a4 4 0 100-8 4 4 0 000 8z" />
  </Svg>
);

export default ProfileIcon;
