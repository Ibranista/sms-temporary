"use client";

import { HttpLink, ApolloLink } from "@apollo/client";
import { ApolloNextAppProvider, ApolloClient, InMemoryCache } from "@apollo/experimental-nextjs-app-support";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useRef } from "react";
import { setContext } from "@apollo/client/link/context";

export function ApolloWrapper({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession();
    const token = session?.accessToken;

    const tokenRef = useRef(token);
    useEffect(() => {
        tokenRef.current = token;
    }, [token]);

    const makeClient = useMemo(() => {
        const authLink = setContext((_, { headers }) => {
            return {
                headers: {
                    ...headers,
                    authorization: tokenRef.current ? `Bearer ${tokenRef.current}` : "",
                },
            };
        });

        const httpLink = new HttpLink({
            uri: "https://sms-gateway-ts.onrender.com/",
            fetchOptions: { cache: "no-store" },
        });

        return () =>
            new ApolloClient({
                cache: new InMemoryCache(),
                link: ApolloLink.from([authLink, httpLink]),
            });
    }, []);

    if (status === "loading") {
        return <div></div>;
    }

    return (
        <ApolloNextAppProvider makeClient={makeClient}>
            {children}
        </ApolloNextAppProvider>
    );
}
