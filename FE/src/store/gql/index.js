import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query GetAllUsers {
    users {
      nodes {
        id
        firstName
        lastName
      }
    }
  }
`;

export const SEARCH_USERS = gql`
query SearchUsers($email: String, $excludeIds: [Int!]) {
  users(
    filter: {
      and: [{ or: [{ email: { includesInsensitive: $email } }] }, { id: { notIn: $excludeIds } }]
    }
  ) {
    nodes {
      id
      firstName
      lastName
      email
      phone
    }
  }
}
`;

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