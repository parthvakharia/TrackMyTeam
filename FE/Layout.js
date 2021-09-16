import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import Constants from 'expo-constants';
import RootNavigation from './src/navigation';
import { Colors, Loading, ErrorModal } from './src/common';
import { useAuthContext } from './src/provider/auth';

const Layout = () => {
  return (
    <>
      <StatusBar style="auto" />
      <View style={styles.container}>
        <NavigationContainer>
          <RootNavigation />
        </NavigationContainer>
      </View>
      {/* {isLoading && <Loading />}
      {!!error && <ErrorModal dispatch={dispatch} error={error} />} */}
    </>
  );
};

export default Layout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    marginTop: Constants.statusBarHeight,
  },
});
