import { gql } from "@apollo/client";

// auth mutation
export const SENDSMS = gql`
mutation CreateMessage($message: String!, $phoneNumber: String!, $senderId: String!, $shortCodeId: String!) {
  createMessage(message: $message, phoneNumber: $phoneNumber, senderId: $senderId, shortCodeId: $shortCodeId) {
    status
  }
}
`;

export const SEND_BULK_SMS = gql`
mutation CreateBulkMessage($messages: String!, $phoneNumbers: [String!]!, $senderId: String!, $shortCodeId: String!) {
  createBulkMessage(messages: $messages, phoneNumbers: $phoneNumbers, senderId: $senderId, shortCodeId: $shortCodeId)
}
`
