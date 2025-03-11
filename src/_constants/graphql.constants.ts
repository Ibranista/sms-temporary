import { ApolloClient, InMemoryCache } from "@apollo/client";

export const createApolloClient = () => {
    return new ApolloClient({
        uri: "https://sms-gateway-ts.onrender.com/",
        cache: new InMemoryCache(),
    });
};