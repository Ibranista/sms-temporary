import { gql } from "@apollo/client";

// auth mutation
export const SENDSMS = gql`
mutation CreateMessage($message: String!, $phoneNumber: String!) {
  createMessage(message: $message, phoneNumber: $phoneNumber) {
    message
    phoneNumber
  }
}
`;
