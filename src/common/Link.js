import React from 'react';
import { TouchableHighlight, Text } from 'react-native';
import { Colors } from '../common';

const Link = ({
  title = 'link',
  underlayColor = Colors.white,
  activeOpacity = 0.7,
  color = Colors.blue,
  ...props
}) => {
  return (
    <TouchableHighlight
      underlayColor={underlayColor}
      activeOpacity={activeOpacity}
      {...props}
    >
      <Text style={{ color }}>{title}</Text>
    </TouchableHighlight>
  );
};

export default Link;
