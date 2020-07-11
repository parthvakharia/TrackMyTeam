import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import Colors from './Colors';

const Loading = () => (
  <View style={styles.loadingWrapper}>
    <View style={styles.loading}>
      <ActivityIndicator size="large" color={Colors.green} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  loadingWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: Colors.shadowLight,
    elevation: 1,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
});

export default Loading;
