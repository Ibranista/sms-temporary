import { ApolloClient, gql, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "https://sms-gateway-ts.onrender.com/",
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