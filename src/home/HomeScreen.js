import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import ViewWithHeader from '../common/Header';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = (params) => {
  const navigation = useNavigation();
  useEffect(() => navigation.setParams({ title: 'Helloworld' }), false);
  return (
    <ViewWithHeader>
      <View>
        <Text>Home 1</Text>
      </View>
    </ViewWithHeader>
  );
};

export default HomeScreen;
