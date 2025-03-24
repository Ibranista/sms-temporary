import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { client, LOGIN_MUTATION } from "./lib/(apollo-client)/mutations/auth.mutation";

export const { handlers, signIn, signOut, auth } = NextAuth({
    pages: {
        signIn: "/auth/sign-in",
    },
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                try {
                    const { data } = await client.mutate({
                        mutation: LOGIN_MUTATION,
                        variables: {
                            email: credentials?.email,
                            password: credentials?.password,
                        },
                    });

                    if (data?.logIn) {
                        return {
                            id: data.logIn.id,
                            email: data.logIn.user.email,
                            token: data.logIn.accessToken,
                            role: data.logIn.user.role,
                        };
                    }
                    return null;
                } catch (error) {
                    console.error("Login error:", error);
                    throw new Error("Invalid credentials");
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.role = user.role;
                token.accessToken = user.token;
            }
            return token;
        },
        async session({ session, token }) {
            session.user.id = token.id;
            session.user.email = token.email;
            session.user.name = token.name;
            session.accessToken = token.accessToken;
            session.role = token.role;
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
});