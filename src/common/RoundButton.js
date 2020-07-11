import React from "react";
import { Button, StyleSheet, TouchableOpacity, Text } from "react-native";
import colors from "./Colors";

const RoundButton = ({
  title,
  color,
  btnStyle = {},
  borderColor,
  textStyle = {},
  ...props
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.roundButton,
        { backgroundColor: color, borderColor },
        btnStyle,
      ]}
      {...props}
    >
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  roundButton: {
    width: "80%",
    borderRadius: 30,
    alignItems: "center",
    backgroundColor: colors.green,
    height: 44,
    borderWidth: 1,
    justifyContent: "center",
    marginBottom: 15,
  },
  text: {
    color: "#000000",
  },
});
export default RoundButton;
