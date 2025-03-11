import { authService } from '@/lib/auth.service';
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const options: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            id: 'Register',
            name: 'Register',
            credentials: {
                phoneNumber: { label: 'phoneNumber', type: 'number', placeholder: 'Abeba & Abebe' },
                password: { label: 'Password', type: 'password' },
                otp: { label: 'OTP', type: 'string' },
                images: { label: 'Images', type: 'file' },
            },
            async authorize(credentials) {
                const { phoneNumber, password, otp, images } = credentials!;
                try {
                    const user = await authService.register({
                        phoneNumber,
                        password,
                        otp,
                        images,
                    });
                    if (user) {
                        return user;
                    }

                    return null;
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                } catch (error: any) {
                    console.error('Error in authorize==>', error);
                    throw new Error(error.message || 'Registration failed');
                }
            },
        }),
        CredentialsProvider({
            id: 'Signin',
            name: 'Signin',
            credentials: {
                email: {
                    label: 'Email',
                    type: 'text',
                    placeholder: 'Email',
                },
                password: {
                    label: 'Password',
                    type: 'password',
                    placeholder: 'Your Password',
                },
            },
            async authorize(credentials) {
                const user = await authService.login(credentials as never);
                if (user) {
                    return user;
                }

                return null;
            },
        }),
    ],

    callbacks: {
        jwt: ({ token, user }) => {
            console.log("jwt is called'==>,:", { token, user })
            if (user) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                token.id = (user as any).id;
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                token.token = (user as any).accessToken;
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                token.email = (user as any).email;
            }
            console.log("jwt is called again'==>,:", { token, user })
            return token;
        },
        session: ({ session, token }) => {
            if (token) {
                session.user = token;
            }

            return session;
        },
    },
    jwt: {
        secret: 'Process',
    },
    session: {
        strategy: 'jwt',
        maxAge: 2592000,
    },
};
