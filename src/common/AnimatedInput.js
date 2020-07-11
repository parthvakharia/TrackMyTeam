import React from "react";
import {
  TextInput,
  StyleSheet,
  TouchableHighlight,
  Dimensions,
} from "react-native";
import colors from "./Colors";

const AnimatedInput = ({ wrapperStyle = {}, style = {}, ...props }) => {
  return (
    <TouchableHighlight style={[styles.container, wrapperStyle]}>
      <TextInput
        placeholderTextColor={colors.darkGrey}
        style={[styles.input, style]}
        {...props}
      />
    </TouchableHighlight>
  );
};
const styles = StyleSheet.create({
  container: {
    borderColor: colors.darkGrey,
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: 18,
    paddingHorizontal: 20,
    paddingVertical: 5,
    width: (Dimensions.get("window").width * 80) / 100,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    fontSize: 24,
    lineHeight: 24,
    color: colors.darkGrey,
    marginBottom: 2
  },
});
export default AnimatedInput;
