import React from 'react';
import {
  TextInput,
  StyleSheet,
  TouchableHighlight,
  Dimensions,
} from 'react-native';

import Colors from './Colors';

const RoundInput = React.forwardRef(
  (
    {
      wrapperStyle = {},
      style = {},
      returnKeyLabel = 'next',
      returnKeyType = 'next',
      textContentType = 'none',
      ...props
    },
    ref
  ) => {
    return (
      <TouchableHighlight style={[styles.container, wrapperStyle]}>
        <TextInput
          ref={ref}
          autoCapitalize="none"
          autoCompleteType="off"
          returnKeyLabel={returnKeyLabel}
          returnKeyType={returnKeyLabel}
          placeholderTextColor={Colors.darkGrey}
          style={[styles.input, style]}
          textContentType={textContentType}
          {...props}
        />
      </TouchableHighlight>
    );
  }
);
const styles = StyleSheet.create({
  container: {
    borderColor: Colors.darkGrey,
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: 18,
    paddingHorizontal: 20,
    paddingVertical: 5,
    width: (Dimensions.get('window').width * 80) / 100,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    fontSize: 24,
    lineHeight: 24,
    color: Colors.darkGrey,
    marginBottom: 2,
  },
});
export default RoundInput;
