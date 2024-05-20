import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import InfoScreen from './src/screens/InfoScreen';
import HomeIcon from './src/assets/icons/HomeIcon';
import InfoIcon from './src/assets/icons/InfoIcon';
import ProfileIcon from './src/assets/icons/ProfileIcon';


const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let IconComponent;

          if (route.name === 'Home') {
            IconComponent = HomeIcon;
          } else if (route.name === 'Info') {
            IconComponent = InfoIcon;
          } else if (route.name === 'Profile') {
            IconComponent = ProfileIcon;
          }

          return <IconComponent color={color} size={size} />;
        },
        tabBarActiveTintColor: '#8D6DE5',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#121212',
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Info" component={InfoScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
