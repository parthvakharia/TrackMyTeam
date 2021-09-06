import React from 'react';
import {
    View,
    Text,
    FlatList
} from 'react-native';
import { ListItem, Button } from 'react-native-elements'

const GroupMemberList = ({ users, onDelete }) => {
    const keyExtractor = (item, index) => `member-${index}`;
    const renderItems = ({ item }) => (
        <ListItem.Swipeable
            bottomDivider
            rightContent={
                <Button
                    icon={{ name: 'delete', color: 'white' }}
                    buttonStyle={{ minHeight: '100%', backgroundColor: 'red' }}
                    onPress={() => onDelete(item)}
                />
            }>
            {/* <Avatar source={{ uri: l.avatar_url }} /> */}
            <ListItem.Content>
                <ListItem.Title>{item.firstName}</ListItem.Title>
            </ListItem.Content>
        </ListItem.Swipeable>
    )

    return (
        <View>
            <View>
                <Text>Group Members List</Text>
            </View>
            <FlatList
                style={{ flex: 1, borderColor: 'red', borderWidth: 1, height: 100 }}
                keyExtractor={keyExtractor}
                renderItem={renderItems}
                data={users}
                extraData={users}
            />
        </View>
    )
}

export default GroupMemberList;