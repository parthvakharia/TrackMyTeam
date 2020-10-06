import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { RoundButton, Colors } from '../common';

const WelcomeScreen = ({ toggleLogin }) => {
  const navigation = useNavigation();
  const navigate = (path) => () => {
    if (path === 'LoginForm') {
      toggleLogin(true);
      return;
    }
    navigation.navigate(path);
  };

  return (
    <View style={styles.welcomeContainer}>
      <Text style={[styles.welcomeText, styles.mb60]}>
        Welcome to {'\n'} Track My Team
      </Text>
      <RoundButton
        title="Log In"
        color="green"
        onPress={navigate('LoginForm')}
      />
      <RoundButton title="Sign Up" onPress={navigate('Register')} />
    </View>
  );
};

const styles = StyleSheet.create({
  welcomeContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  welcomeText: {
    fontSize: 30,
    lineHeight: 36,
    fontWeight: '400',
    textAlign: 'center',
    color: Colors.green,
  },
  mb60: { marginBottom: 60 },
});

export default WelcomeScreen;
