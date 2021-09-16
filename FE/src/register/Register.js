import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Keyboard,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RoundInput, RoundButton, Link, Colors } from '../common';
import { useAuthContext } from '../provider/auth';

const RegisterScreen = () => {
  const keyboardType =
    Platform.OS === 'ios' ? 'ascii-capable' : 'email-address';
  const { store, dispatch, register } = useAuthContext();
  const navigation = useNavigation();
  const firstNameRef = React.createRef();
  const lastNameRef = React.createRef();
  const emailRef = React.createRef();
  const phoneNumberRef = React.createRef();
  const passwordRef = React.createRef();
  const [state, setState] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    password: '',
    location: [21.7833, 72.22334],
  });

  const onInputChange = (field) => (value) => {
    setState({
      ...state,
      [field]: value,
    });
  };

  const focusField = (fieldName) => () => {
    try {
      switch (fieldName) {
        case 'firstName':
          firstNameRef.current.focus();
          break;
        case 'lastName':
          lastNameRef.current.focus();
          break;
        case 'phoneNumber':
          phoneNumberRef.current.focus();
          break;
        case 'email':
          emailRef.current.focus();
          break;
        case 'password':
          passwordRef.current.focus();
          break;
      }
    } catch { }
  };

  const registerUser = async () => {
    Keyboard.dismiss();
    const success = await register({ ...state });
    if (success) {
      Alert.alert(
        'Register',
        'User registered Successfully. Please login to use our service.',
        [{ text: 'OK', onPress: () => navigation.navigate('Login') }],
        { cancelable: false }
      );
    }
  };

  const disableBtn =
    !state.firstName ||
    !state.lastName ||
    !state.phoneNumber ||
    !state.email ||
    !state.password;
  return (
    <View style={styles.container}>
      <Text style={styles.signInText}>Create new account</Text>
      <RoundInput
        ref={firstNameRef}
        placeholder="First Name"
        keyboardType={keyboardType}
        onSubmitEditing={focusField('lastName')}
        onChangeText={onInputChange('firstName')}
      />
      <RoundInput
        ref={firstNameRef}
        placeholder="Last Name"
        keyboardType={keyboardType}
        onSubmitEditing={focusField('phoneNumber')}
        onChangeText={onInputChange('lastName')}
      />
      <RoundInput
        ref={phoneNumberRef}
        placeholder="Phone Number"
        keyboardType={'phone-pad'}
        onSubmitEditing={focusField('email')}
        onChangeText={onInputChange('phoneNumber')}
      />
      <RoundInput
        ref={emailRef}
        placeholder="E-mail Address"
        keyboardType={keyboardType}
        onSubmitEditing={focusField('password')}
        onChangeText={onInputChange('email')}
      />
      <RoundInput
        ref={passwordRef}
        secureTextEntry
        wrapperStyle={styles.mb31}
        placeholder="Password"
        onSubmitEditing={registerUser}
        returnKeyLabel="go"
        returnKeyType="go"
        textContentType="password"
        onChangeText={onInputChange('password')}
      />
      <RoundButton title="Sign Up" onPress={registerUser} color="green" disableBtn={disableBtn} />
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
