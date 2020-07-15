import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';

import HomeScreen from './HomeScreen';
import MapScreen from '../map/MapScreen';
import { Colors } from '../common';
{
  /* <FontAwesome name="group" size={24} color="black" /> */
}

const Tab = createBottomTabNavigator();

const screenOptions = ({ route }) => ({
  tabBarIcon: ({ focused, color, size }) => {
    let iconName;

    if (route.name === 'Groups') {
      iconName = focused ? 'group' : 'group';
    } else if (route.name === 'Map') {
      iconName = focused ? 'map' : 'map-o';
    }

    return <FontAwesome name={iconName} size={size} color={color} />;
  },
});
const tabBarOptions = {
  activeTintColor: Colors.green,
  inactiveTintColor: Colors.shadowDark,
};

export default function App() {
  return (
    <Tab.Navigator screenOptions={screenOptions} tabBarOptions={tabBarOptions}>
      <Tab.Screen
        name="Groups"
        component={HomeScreen}
      />
      <Tab.Screen name="Map" component={MapScreen} />
    </Tab.Navigator>
  );
}
