import { gql } from '@apollo/client';

export const CREATE_GROUP = gql`
mutation createGroup($group: GroupInput!) {
  createGroup(input: { group: $group }) {
    group {
      id
    }
  }
}
`;

export const CREATE_GROUP_MEMBER = gql`
mutation CreateGroupMember($groupMember: GroupMemberInput!) {
  createGroupMember(input: { groupMember: $groupMember }) {
    groupMember {
      id
    }
  }
}
`