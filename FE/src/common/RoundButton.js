import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import Colors from './Colors';

const RoundButton = ({
  title,
  color,
  textStyle = {},
  btnStyle = {},
  ...props
}) => {
  const isBtnDisabled = props.disabled;
  let btnColorStyle = {};
  let btnTextStyle = {};
  switch (color) {
    case 'green':
      btnColorStyle = styles.greenBtn;
      btnTextStyle = styles.greenBtnText;
      break;
    case 'white':
    default:
      btnColorStyle = styles.WhiteBtn;
      btnTextStyle = styles.whiteBtnText;
      break;
  }

  return (
    <TouchableOpacity
      style={[
        styles.roundButton,
        btnColorStyle,
        btnStyle,
        { opacity: isBtnDisabled ? 0.5 : 1 },
      ]}
      {...props}
    >
      <Text style={[styles.text, btnTextStyle, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  roundButton: {
    width: '80%',
    borderRadius: 30,
    alignItems: 'center',
    height: 44,
    borderWidth: 1,
    justifyContent: 'center',
    marginBottom: 15,
    elevation: 4,
  },
  text: {
    color: '#000000',
  },
  greenBtn: {
    backgroundColor: Colors.green,
    borderColor: Colors.green,
  },
  greenBtnText: {
    color: Colors.white,
  },
  WhiteBtn: {
    backgroundColor: Colors.white,
    borderColor: Colors.green,
  },
  whiteBtnText: {
    color: Colors.green,
  },
});
export default RoundButton;
