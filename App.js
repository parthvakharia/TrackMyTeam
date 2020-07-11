import "react-native-gesture-handler";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import Constants from "expo-constants";

import { StoreProvider } from "./src/store";
import RootNavigation from "./src/navigation";
import colors from "./src/common/Colors";

export default function App() {
  return (
    <StoreProvider>
      <StatusBar style="auto" />
      <View style={styles.container}>
        <NavigationContainer style={styles.container}>
          <RootNavigation />
        </NavigationContainer>
      </View>
    </StoreProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    marginTop: Constants.statusBarHeight,
  },
});
