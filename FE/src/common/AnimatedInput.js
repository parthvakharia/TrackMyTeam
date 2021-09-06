import React, { useState, useEffect } from 'react';
import { View, TextInput, Animated, StyleSheet } from 'react-native';
import Colors from './Colors';

const AnimatedInput = ({ children, label, onFocus, onBlur, ...props }) => {
  const [animatedInputState, setState] = useState(() => {
    const animatedIsFocused = new Animated.Value(props.value === '' ? 0 : 1);
    return {
      animatedIsFocused,
      isFocused: false,
    };
  });
  const handleFocus = () => {
    setState({ ...animatedInputState, isFocused: true });
    onFocus && onFocus();
  };
  const handleBlur = () => {
    setState({ ...animatedInputState, isFocused: false });
    onBlur && onBlur();
  };

  const { animatedIsFocused, isFocused } = animatedInputState;
  const labelStyle = {
    position: 'absolute',
    left: 0,
    top: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [18, 0],
    }),
    fontSize: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [20, 14],
    }),
    color: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [Colors.darkGrey, Colors.black],
    }),
  };

  useEffect(() => {
    Animated.timing(animatedIsFocused, {
      toValue: isFocused || props.value !== '' ? 1 : 0,
      duration: 200,
      useNativeDriver: false
    }).start();
  });

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <View style={styles.textFieldWrapper}>
        <Animated.Text style={labelStyle}>{label}</Animated.Text>
        <TextInput
          {...props}
          style={styles.textField}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </View>
      {!!children && children}
    </View>
  );
};

export default AnimatedInput;

const styles = StyleSheet.create({
  textFieldWrapper: { paddingTop: 20, marginBottom: 18, flexGrow: 1 },
  textField: {
    height: 26,
    fontSize: 20,
    color: Colors.darkGrey,
    borderBottomWidth: 1,
    borderBottomColor: Colors.darkGrey,
  },
});
