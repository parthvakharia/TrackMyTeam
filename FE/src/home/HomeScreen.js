import React, { useEffect } from 'react';
import { View, Text, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import ViewWithHeader, { MenuBtn } from '../common/Header';
import MapScreen from '../map';

const HomeScreen = () => {
  const navigation = useNavigation();
  const gotoAddGroup = () => {
    navigation.navigate('Group');
  };

  return (
    <ViewWithHeader
      leftBtn={MenuBtn}
      rightBtnProps={{
        title: 'Groups',
        icon: Platform.OS === 'ios' ? 'ios-add' : 'md-add',
        onPress: gotoAddGroup,
      }}
    >
      <MapScreen />
    </ViewWithHeader>
  );
};

export default HomeScreen;
