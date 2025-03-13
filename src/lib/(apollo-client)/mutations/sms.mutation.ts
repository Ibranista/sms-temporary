import { gql } from "@apollo/client";

// auth mutation
export const SENDSMS = gql`
mutation SendSMS($phoneNumber: String!, $message: String!) {
  sendSMS(phoneNumber: $phoneNumber, message: $message) {
    status
  }
}
`;
