import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { AnimatedInput, RoundButton, Link, Colors } from '../common';

const RegisterScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.signInText}>Create new account</Text>
      <AnimatedInput placeholder="Username" />
      <AnimatedInput placeholder="Phone Number" />
      <AnimatedInput placeholder="E-mail Address" />
      <AnimatedInput wrapperStyle={styles.mb31} placeholder="Password" />
      <RoundButton title="Sign Up" color="green" />
      <Link
        title=" Already register ? Go to Login."
        onPress={navigation.goBack}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  signInText: {
    color: Colors.green,
    fontSize: 30,
    lineHeight: 36,
    fontWeight: '400',
    textAlign: 'center',
    marginBottom: 49,
  },
  mb31: { marginBottom: 31 },
});

export default RegisterScreen;
