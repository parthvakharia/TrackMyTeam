import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../login';
import HomeNavigator from '../home/HomeNavigator';
import RegisterScreen from '../register';
import Map from '../map/Map';

const Stack = createStackNavigator();
const NO_HEADER = () => {
  return null;
};

const RootNavigation = () => (
  <>
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          header: NO_HEADER,
        }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          header: NO_HEADER,
        }}
      />
      <Stack.Screen name="HomeNavigator" component={HomeNavigator} />
      <Stack.Screen name="Map" component={Map} />
    </Stack.Navigator>
    {/* <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeScreen} />
    </Drawer.Navigator> */}
  </>
);

export default RootNavigation;
