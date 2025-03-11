import { gql } from "@apollo/client";

// auth mutation
export const LOGIN = gql`
  mutation LogIn($email: String!, $password: String!) {
    logIn(email: $email, password: $password) {
      accessToken
      user {
        phone
        email
        name
        role {
          id
        }
        id
      }
    }
  }
`;