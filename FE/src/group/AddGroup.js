import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useMutation } from '@apollo/client';
import { CREATE_GROUP, CREATE_GROUP_MEMBER } from '../store/gql';
import ViewWithHeader, { MenuBtn } from '../common/Header';
import { Colors, AnimatedInput } from '../common';
import { Button } from 'react-native-elements'
import SearchUsersList from './SearchUsersList';
import GroupMemberList from './GroupMemberList';
import { useAuthContext } from '../provider/auth';

const AddGroupScreen = (params) => {
  const { store: { user: loggedInUser } } = useAuthContext();
  const [state, setState] = useState({
    name: '',
    description: '',
    addedGroupMembers: [],
  });
  const [createGroup, { data: { createGroup: createdGroup } = {} }] = useMutation(CREATE_GROUP);
  const [createGroupMember] = useMutation(CREATE_GROUP_MEMBER);
  const onInputChange = (field) => (value) => setState({ ...state, [field]: value });

  useEffect(() => {
    const createdGroupId = createdGroup?.group?.id || -1;

    if (createdGroupId > -1) {
      let date = new Date();
      date = date.toISOString();
      state.addedGroupMembers.map((member) => {
        createGroupMember({
          variables: {
            groupMember: {
              groupId: createdGroupId,
              userId: member.id,
              createdAt: date,
              updatedAt: date
            }
          }
        });
      });
    }
  }, [createdGroup])

  const onUserSelect = (user) => {
    const { addedGroupMembers } = state;
    const isUserAlreadyMember = addedGroupMembers.find((member) => member.id === user.id);

    if (!isUserAlreadyMember) {
      addedGroupMembers.push(user)
      setState({
        ...state,
        addedGroupMembers
      })
    }
  }

  const onDeleteGroupMember = (member) => {
    const { addedGroupMembers } = state;
    const memberIndex = addedGroupMembers.findIndex((user) => member.id === user.id);

    if (memberIndex > -1) {
      addedGroupMembers.splice(memberIndex, 1)
      setState({
        ...state,
        addedGroupMembers
      })
    }
  }

  const createGroupHandler = () => {
    const { name, description } = state;
    if (!name) return;

    let date = new Date();
    date = date.toISOString();
    const groupInput = {
      name,
      description,
      ownerId: loggedInUser.id,
      createdAt: date,
      updatedAt: date
    }
    createGroup({
      variables: {
        group: groupInput
      }
    });
  }

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
        <GroupMemberList users={state.addedGroupMembers} onDelete={onDeleteGroupMember} />
        <SearchUsersList
          state={state}
          onUserSelect={onUserSelect}
        />
        <Button onPress={createGroupHandler} title="Create Group" icon={<Ionicons name="add-outline" />}></Button>
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
