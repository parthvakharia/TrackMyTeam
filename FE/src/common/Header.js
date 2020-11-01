import React from 'react';
import Constants from 'expo-constants';
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import Colors from './Colors';
const ICON_SIZE = 30;
const BTN_TOUCH_OPACITY = 0.6;

const BackBtn = () => {
  const navigation = useNavigation();
  return (
    <TouchableHighlight
      activeOpacity={BTN_TOUCH_OPACITY}
      underlayColor={Colors.transparent}
      onPress={navigation.goBack}
    >
      <View style={styles.flexDirectionRow}>
        <Ionicons
          name={Platform.OS === 'ios' ? 'ios-arrow-back' : 'md-arrow-back'}
          size={ICON_SIZE}
          color={Colors.green}
        />
      </View>
    </TouchableHighlight>
  );
};

const RightBtn = ({ onPress = {}, title = 'btn', icon = null }) => (
  <TouchableHighlight
    onPress={onPress}
    activeOpacity={BTN_TOUCH_OPACITY}
    underlayColor={Colors.transparent}
  >
    <View style={styles.flexDirectionRow}>
      {icon && <Ionicons name={icon} size={ICON_SIZE} color={Colors.green} />}
      <Text style={icon ? styles.ml5 : {}}>{title}</Text>
    </View>
  </TouchableHighlight>
);

export const MenuBtn = () => {
  const navigation = useNavigation();
  return (
    <TouchableHighlight
      activeOpacity={BTN_TOUCH_OPACITY}
      underlayColor={Colors.transparent}
      onPress={navigation.openDrawer}
    >
      <View style={styles.flexDirectionRow}>
        <Ionicons
          name={Platform.OS === 'ios' ? 'ios-menu' : 'md-menu'}
          size={ICON_SIZE}
          color={Colors.green}
        />
      </View>
    </TouchableHighlight>
  );
};

const Header = ({
  leftBtn: LeftBtn = BackBtn,
  rightBtnProps = undefined,
  title = 'Header Name',
}) => {
  return (
    <View style={styles.header}>
      <View style={styles.flexDirectionRow}>
        <View style={styles.ml10}>
          <LeftBtn />
        </View>
        <Text style={styles.headerText}>{title}</Text>
      </View>
      {rightBtnProps && (
        <View style={styles.mr10}>
          <RightBtn {...rightBtnProps} />
        </View>
      )}
    </View>
  );
};
const ViewWithHeader = ({
  leftBtn,
  rightBtnProps,
  title,
  children,
  header = true,
}) => {
  return (
    <>
      {header && (
        <Header leftBtn={leftBtn} rightBtnProps={rightBtnProps} title={title} />
      )}
      <View style={styles.flex1}>{children}</View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: Colors.white,
    height: 90 - Constants.statusBarHeight,
    borderBottomColor: Colors.grey,
    borderBottomWidth: 1,
    elevation: 5,
  },
  headerText: { marginLeft: 20, color: Colors.black },
  flex1: { flex: 1 },
  flexDirectionRow: { flexDirection: 'row', alignItems: 'center' },
  ml5: { marginLeft: 5 },
  ml10: { marginLeft: 10 },
  mr10: { marginRight: 10 },
});

export default ViewWithHeader;
