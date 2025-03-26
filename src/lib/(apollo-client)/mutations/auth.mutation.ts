import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const client = new ApolloClient({
  uri: BASE_URL,
  cache: new InMemoryCache(),
});

// auth mutation
export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    logIn(email: $email, password: $password) {
    accessToken
    user {
      id
      email
      role {
        id
        name
      }
    }
  }
  }
`;