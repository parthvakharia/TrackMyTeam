import { gql } from '@apollo/client';

exports.GET_USERS = gql`
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
