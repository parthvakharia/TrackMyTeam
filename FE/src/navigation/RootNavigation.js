import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

import LoginScreen from '../login';
import DrawerNavigator from './DrawerNavigator';
import RegisterScreen from '../register';

const Stack = createStackNavigator();

const NO_HEADER = () => {
  return null;
};

const RootNavigation = () => (
  <>
    <Stack.Navigator initialRouteName="Home">
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
      <Stack.Screen
        name="Home"
        component={DrawerNavigator}
        options={{
          header: NO_HEADER,
        }}
      />
    </Stack.Navigator>
  </>
);

export default RootNavigation;
