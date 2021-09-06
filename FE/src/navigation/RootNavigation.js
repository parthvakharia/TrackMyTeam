import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

import LoginScreen from '../login';
import DrawerNavigator from './DrawerNavigator';
import RegisterScreen from '../register';
import AddGroupScreen from '../group';

const Stack = createStackNavigator();

const noHeader = {
  header: () => null,
};

const RootNavigation = () => (
  <>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{  }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
        }}
      />
      <Stack.Screen
        name="Home"
        component={DrawerNavigator}
        options={{
          ...noHeader
        }}
      />
      <Stack.Screen
        name="Group"
        component={AddGroupScreen}
        options={{
          gestureDirection: 'horizontal',
        }}
      />
    </Stack.Navigator>
  </>
);

export default RootNavigation;
