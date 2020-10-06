import React from 'react';
import Constants from 'expo-constants';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';

import Colors from './Colors';

const Header = () => {
  return (
    <View style={styles.header}>
      <View style={{ minWidth: 10, flexDirection: 'row' }}>
        <TouchableHighlight style={{ paddingRight: 20 }}>
          <Text>Back</Text>
        </TouchableHighlight>
        <Text>Helloworld</Text>
      </View>
      <View style={{ minWidth: 10 }}>
        <TouchableHighlight>
          <Text>Add</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};
const ViewWithHeader = ({ children }) => {
  return (
    <>
      <Header />
      <View style={{ flex: 1 }}>{children}</View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: Colors.white,
    height: 90 - Constants.statusBarHeight,
  },
});

export default ViewWithHeader;
