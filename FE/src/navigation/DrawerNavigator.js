import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Text } from 'react-native';

import HomeScreen from '../home/HomeScreen';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeScreen} />
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
