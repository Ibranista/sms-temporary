import { gql } from "@apollo/client";

// sms query
export const GET_SHORT_CODES = gql`
  query ShortCodes($shortCodesPage: Int!) {
    shortCodes(page: $shortCodesPage) {
      id
      shortCode
      SenderID {
        id
        senderID
      }
    }
  }
`;