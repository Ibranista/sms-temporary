"use client"; // Required for Client Components

import { HttpLink } from "@apollo/client";
import {
    ApolloNextAppProvider,
    ApolloClient,
    InMemoryCache,
} from "@apollo/experimental-nextjs-app-support";

function makeClient() {
    return new ApolloClient({
        cache: new InMemoryCache(),
        link: new HttpLink({
            uri: "https://sms-gateway-ts.onrender.com/",
            fetchOptions: { cache: "no-store" },
        }),
    });
}

export function ApolloWrapper({ children }: { children: React.ReactNode }) {
    return <ApolloNextAppProvider makeClient={makeClient}>{children}</ApolloNextAppProvider>;
}
