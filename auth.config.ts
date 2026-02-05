import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    providers: [],
    callbacks: {
        authorized({ request, auth }) {

            // array of regex patterns of path we want to protect
            const protectedPaths = [
                /\/admin/,
            ]

            // get pathname from the req url object
            const { pathname } = request.nextUrl
            //check if user is not authenticated and accssing a protected path

            // if (!auth && protectedPaths.some((p) => p.test(pathname))) return false;

            return true
        }
    }
} satisfies NextAuthConfig;
