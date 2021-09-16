import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../login';
import DrawerNavigator from './DrawerNavigator';
import RegisterScreen from '../register';
import { useAuthContext } from '../provider/auth';
import AddGroupScreen from '../group';

const Stack = createStackNavigator();

const noHeader = {
  header: () => null,
};

const RootNavigation = () => {
  const { store: { user } } = useAuthContext();

  if (user) {
    return (
      <Stack.Navigator initialRouteName="Root">
        <Stack.Screen
          name="Root"
          component={DrawerNavigator}
          options={{
            ...noHeader
          }}
        />
        <Stack.Screen
          name="Group"
          component={AddGroupScreen}
          options={{
            ...noHeader
          }}
        />
      </Stack.Navigator>
    )
  }

  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{}}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
        }}
      />
    </Stack.Navigator>
  )
};

export default RootNavigation;
