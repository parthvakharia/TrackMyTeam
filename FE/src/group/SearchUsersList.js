import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList
} from 'react-native';
import { useLazyQuery } from '@apollo/client';
import { SEARCH_USERS } from '../store/gql';
import { ListItem } from 'react-native-elements'
const LOGGED_IN_USER_ID = 1;

const SearchUsersList = ({ state, setState, searchText, onUserSelect }) => {
    const keyExtractor = (item, index) => index.toString();
    const [searchUsers, { loading, error, data: { users } = {} }] = useLazyQuery(SEARCH_USERS);
    const [searchedUsers, setSearchedUsers] = useState(undefined);

    useEffect(() => {
        if (!searchText) {
            setSearchedUsers(undefined)
            return
        };

        const { addedGroupMembers } = state;
        const excludedIds = addedGroupMembers.map(member => member.id);
        excludedIds.push(LOGGED_IN_USER_ID);

        searchUsers({
            variables: {
                email: searchText,
                excludeIds: excludedIds
            }
        });
    }, [searchText, state.addedGroupMembers])

    useEffect(() => {
        setSearchedUsers(users?.nodes ?? undefined)
    }, [users])

    const renderItem = ({ item }) => {
        return (
            <ListItem bottomDivider onPress={() => onUserSelect(item)}>
                {/* <Avatar source={{ uri: l.avatar_url }} /> */}
                <ListItem.Content>
                    <ListItem.Title>{item.firstName}</ListItem.Title>
                </ListItem.Content>
            </ListItem>
        )
    }

    return (
        <View>
            <FlatList
                style={{ borderColor: 'red', borderWidth: 1, height: searchedUsers?.length < 3 ? 50 * searchedUsers?.length : 150 }}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                data={searchedUsers}
            />
        </View>
    )
}

export default SearchUsersList;