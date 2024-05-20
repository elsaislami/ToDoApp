import React from 'react';
import Svg, { Path } from 'react-native-svg';

const HomeIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M3 9.5L12 3l9 6.5v11.5h-6v-7h-6v7H3z" />
  </Svg>
);

export default HomeIcon;
