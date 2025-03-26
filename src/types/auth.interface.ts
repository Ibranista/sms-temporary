// types/next-auth.d.ts
import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
    /**
     * Extends the built-in `User` type
     */
    interface User {
        id?: string;
        // email: string;
        role: string;
        token?: string;
    }

    /**
     * Extends the built-in `Session` type
     */
    interface Session {
        user: {
            id: string;
            email: string;
            name?: string;
            role?: string;
        };
        accessToken?: string;
    }
}

declare module "next-auth/jwt" {
    /**
     * Extends the built-in `JWT` type
     */
    interface JWT {
        id: string;
        email: string;
        role?: string;
        accessToken?: string;
    }
}