import 'react-native-gesture-handler';
import React, { useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import Constants from 'expo-constants';

import StoreContext from './src/store';
import RootNavigation from './src/navigation';
import { Colors, Loading, ErrorModal } from './src/common';
import { useQuery } from '@apollo/client';
import { GET_USERS } from './src/store/gql';
import './Setup';

const Layout = () => {
  const {
    store: { isLoading, error },
    dispatch,
  } = useContext(StoreContext);
  const { loading, error: error1, data } = useQuery(GET_USERS);
  console.log(loading, data, error1);
  return (
    <>
      <StatusBar style="auto" />
      <View style={styles.container}>
        <NavigationContainer>
          <RootNavigation />
        </NavigationContainer>
      </View>
      {isLoading && <Loading />}
      {!!error && <ErrorModal dispatch={dispatch} error={error} />}
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
