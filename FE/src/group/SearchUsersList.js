import React, { useEffect, useState } from 'react';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import { useLazyQuery } from '@apollo/client';
import { SEARCH_USERS } from '../store/gql';
import { ListItem } from 'react-native-elements';
import { Dimensions, StyleSheet } from 'react-native';
import { Colors } from '../common';
import { useAuthContext } from '../provider/auth';

const SearchUsersList = ({ state, onUserSelect }) => {
    const { store: { user: loggedInUser } } = useAuthContext();
    const [searchUsers, { loading, error, data: { users } = {} }] = useLazyQuery(SEARCH_USERS);
    const [searchedUsers, setSearchedUsers] = useState(null);

    const getUsers = (searchText) => {
        if (!searchText || searchText.length < 3) {
            setSearchedUsers(null)
            return
        };

        const { addedGroupMembers } = state;
        const excludedIds = addedGroupMembers.map(member => member.id);
        excludedIds.push(loggedInUser.id);

        searchUsers({
            variables: {
                email: searchText,
                excludeIds: excludedIds
            }
        });
    }

    useEffect(() => {
        setSearchedUsers(users?.nodes ?? undefined)
    }, [users])

    const renderItem = (item, text) => {
        return (
            <ListItem bottomDivider>
                <ListItem.Content>
                    <ListItem.Title>{item.firstName}</ListItem.Title>
                </ListItem.Content>
            </ListItem>
        )
    }

    return (
        <AutocompleteDropdown
            dataSet={searchedUsers}
            onChangeText={getUsers}
            onSelectItem={(item) => {
                item && onUserSelect(item)
            }}
            debounce={600}
            suggestionsListMaxHeight={Dimensions.get("window").height * 0.4}
            loading={loading}
            useFilter={false}
            textInputProps={{
                placeholder: "Add member by PhoneNumber/ Email",
                autoCorrect: false,
                autoCapitalize: "none",
                placeholderTextColor: Colors.darkGrey,
                style: styles.textInput
            }}
            rightButtonsContainerStyle={styles.rightButtonsContainer}
            inputContainerStyle={styles.inputContainer}
            containerStyle={{ paddingTop: 20, marginBottom: 18, }}
            renderItem={renderItem}
            inputHeight={50}
            showChevron={true}
        />
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.darkGrey,
    },
    rightButtonsContainer: {
        borderRadius: 25,
        right: 0,
        height: 26,
        top: 0,
        alignSelf: "center",
        backgroundColor: Colors.transparent
    },
    textInput: {
        height: 26,
        fontSize: 20,
        color: Colors.black,
        backgroundColor: Colors.transparent,
        paddingLeft: 0
    }
})

export default SearchUsersList;