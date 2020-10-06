import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeTabNavigator from '../home/HomeTabNavigator';
import { View, Text } from 'react-native-animatable';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeTabNavigator} />
      <Drawer.Screen
        name="Profile"
        component={() => (
          <View>
            <Text>Profile</Text>
          </View>
        )}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
