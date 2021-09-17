import { gql } from '@apollo/client';

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
