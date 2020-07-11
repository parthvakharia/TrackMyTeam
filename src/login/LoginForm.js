import React, { useContext } from "react";
import {
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  TouchableHighlight,
} from "react-native";

import StoreContext from "../store";
import { registerUser, signIn } from "../store/AuthActions";
import { RoundButton, AnimatedInput } from "../common";
import colors from "../common/Colors";

const AlreadyRegisterLink = ({ toggleLogin }) => {
  return (
    <TouchableHighlight
      underlayColor={colors.white}
      activeOpacity={0.7}
      onPress={() => toggleLogin(false)}
    >
      <Text style={{ color: colors.blue }}>
        Already register ? Go to Login.
      </Text>
    </TouchableHighlight>
  );
};

const LoginForm = ({ toggleLogin }) => {
  const { store, dispatch } = useContext(StoreContext);
  const behaviour = Platform.OS == "ios" ? "padding" : "height";

  return (
    <KeyboardAvoidingView style={styles.loginContainer} behavior={behaviour}>
      <Text style={styles.signInText}>Sign In</Text>
      <AnimatedInput placeholder="username" />
      <AnimatedInput wrapperStyle={styles.mb31} placeholder="password" />
      <RoundButton
        color={colors.green}
        borderColor={colors.green}
        textStyle={styles.btnTextWhite}
        title="Log In"
      />
      <AlreadyRegisterLink toggleLogin={toggleLogin} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  btnTextWhite: { color: colors.white },
  mb31: { marginBottom: 31 },
  signInText: {
    color: colors.green,
    fontSize: 30,
    lineHeight: 36,
    fontWeight: "400",
    textAlign: "center",
    marginBottom: 49,
  },
});

export default LoginForm;
