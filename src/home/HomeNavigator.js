import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import HomeScreen from "../home";

const Drawer = createDrawerNavigator();

const HomeNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeScreen} />
    </Drawer.Navigator>
  );
};

export default HomeNavigator;
