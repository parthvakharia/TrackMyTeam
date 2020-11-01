import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Platform,
  TouchableHighlight,
  StyleSheet,
  Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import ViewWithHeader, { MenuBtn } from '../common/Header';
import { Colors, AnimatedInput } from '../common';

const AddGroupScreen = (params) => {
  const [state, setState] = useState({
    name: '',
    description: '',
    searchText: '',
  });
  const navigation = useNavigation();
  const searchUser = () => {};
  const onInputChange = (field) => (value) =>
    setState({ ...state, [field]: value });

  return (
    <ViewWithHeader title="Create Group">
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.white,
          paddingHorizontal: 15,
          paddingTop: 15,
        }}
      >
        <AnimatedInput
          label="Name"
          value={state.name}
          onChangeText={onInputChange('name')}
        />
        <AnimatedInput
          label="Description"
          value={state.description}
          onChangeText={onInputChange('description')}
        />
        <View>
          <Text>Group Members</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <AnimatedInput
            label="Email/Phonenumber"
            value={state.searchText}
            onChangeText={onInputChange('searchText')}
          >
            <TouchableHighlight
              onPress={searchUser}
              activeOpacity={0.6}
              underlayColor={Colors.transparent}
              style={{ marginLeft: 8 }}
            >
              <View>
                <Text style={{ color: Colors.green }}>Search</Text>
              </View>
            </TouchableHighlight>
          </AnimatedInput>
        </View>
      </View>
    </ViewWithHeader>
  );
};

// const styles = StyleSheet.create({
//   centeredView: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 22,
//   },
//   modalView: {
//     backgroundColor: 'white',
//     borderRadius: 20,
//     paddingVertical: 15,
//     justifyContent: 'space-between',
//     height: 200,
//     width: '70%',
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   header: {
//     width: '100%',
//     paddingBottom: 8,
//     borderBottomColor: Colors.green,
//     borderBottomWidth: 1,
//   },
//   headerText: {
//     fontSize: 20,
//     fontWeight: '400',
//     textAlign: 'center',
//     color: Colors.darkGrey,
//   },
//   body: {
//     width: '100%',
//     paddingHorizontal: 15,
//     alignItems: 'center',
//   },
//   bodyText: {
//     fontSize: 16,
//     fontWeight: '400',
//     color: Colors.darkGrey,
//   },
//   errorCode: { margin: 10, color: Colors.darkGrey },
//   button: { marginBottom: 0 },
// });
export default AddGroupScreen;
