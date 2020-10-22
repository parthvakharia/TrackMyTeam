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