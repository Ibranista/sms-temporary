import { ApolloClient, InMemoryCache } from "@apollo/client";

export const createApolloClient = () => {
    const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    return new ApolloClient({
        uri: BASE_URL,
        cache: new InMemoryCache(),
    });
};