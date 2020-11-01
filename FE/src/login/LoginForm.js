import React, { useContext, useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import StoreContext from '../store';
import { RoundButton, RoundInput, Link, Colors } from '../common';
import { signIn } from '../store/AuthActions';

// import { useDispatch } from 'react-redux'

const LoginForm = ({ toggleLogin }) => {
  const { store, dispatch } = useContext(StoreContext);
  const [state, setState] = useState({
    email: '',
    password: '',
  });
  // const dispatch = useDispatch();
  
  const navigation = useNavigation();
  const behaviour = Platform.OS == 'ios' ? 'padding' : 'height';
  const usernameRef = React.createRef();
  const passwordRef = React.createRef();
  const disableSubmit = !state.email || !state.password;
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
    Keyboard.dismiss();
    const { email, password } = state;
    console.log('loggin in');
    if (email && password) {
      console.log('loggin in 1');
      const user = await signIn(store, dispatch, { email, password });
      console.log(user);
      if (user) {
        navigation.navigate('HomeNavigator');
      }
    }
  };

  useEffect(() => {
    focusField('username')();
  }, [false]);

  return (
    <KeyboardAvoidingView style={styles.loginContainer} behavior={behaviour}>
      <Text style={styles.signInText}>Sign In</Text>
      <RoundInput
        ref={usernameRef}
        placeholder="Email"
        keyboardType={keyboardType}
        onSubmitEditing={focusField('password')}
        onChangeText={onInputChange('email')}
      />
      <RoundInput
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
