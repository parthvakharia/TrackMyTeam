import React, { useContext, useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import StoreContext from '../store';
import { RoundButton, AnimatedInput, Link, Colors } from '../common';
import { signIn } from '../store/AuthActions';

const LoginForm = ({ toggleLogin }) => {
  const { store, dispatch } = useContext(StoreContext);
  const [state, setState] = useState({
    username: '',
    password: '',
  });

  const navigation = useNavigation();
  const behaviour = Platform.OS == 'ios' ? 'padding' : 'height';
  const usernameRef = React.createRef();
  const passwordRef = React.createRef();
  const disableSubmit = !state.username || !state.password;
  const keyboardType =
    Platform.OS === 'ios' ? 'ascii-capable' : 'email-address';

  const toggleLoginPage = () => {
    return toggleLogin(false);
  };
  const onInputChange = (field) => (value) => {
    setState({
      ...state,
      [field]: value,
    });
  };
  const focusField = (fieldName) => () => {
    try {
      switch (fieldName) {
        case 'username':
          usernameRef.current.focus();
          break;
        case 'password':
          passwordRef.current.focus();
          break;
      }
    } catch {}
  };
  const loginIn = async () => {
    const { username, password } = state;
    if (username && password) {
      const user = await signIn(store, dispatch, { email: username, password });
      navigation.navigate('HomeNavigator');
    }
  };

  useEffect(() => {
    focusField('username')();
  }, [false]);

  return (
    <KeyboardAvoidingView style={styles.loginContainer} behavior={behaviour}>
      <Text style={styles.signInText}>Sign In</Text>
      <AnimatedInput
        ref={usernameRef}
        placeholder="Username"
        autoCapitalize="none"
        autoCompleteType="off"
        keyboardType={keyboardType}
        onSubmitEditing={focusField('password')}
        onChangeText={onInputChange('username')}
      />
      <AnimatedInput
        ref={passwordRef}
        secureTextEntry
        wrapperStyle={styles.mb31}
        placeholder="Password"
        returnKeyLabel="go"
        returnKeyType="go"
        textContentType="password"
        onSubmitEditing={loginIn}
        onChangeText={onInputChange('password')}
      />
      <RoundButton
        disabled={disableSubmit}
        onPress={loginIn}
        color="green"
        title="Log In"
      />
      <Link
        title=" Already register ? Go to Login."
        onPress={toggleLoginPage}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  btnTextWhite: { color: Colors.white },
  mb31: { marginBottom: 31 },
  signInText: {
    color: Colors.green,
    fontSize: 30,
    lineHeight: 36,
    fontWeight: '400',
    textAlign: 'center',
    marginBottom: 49,
  },
});

export default LoginForm;
