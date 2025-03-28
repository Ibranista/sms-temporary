import { auth } from "@/auth";
import { permissions } from "./utils/permissions";

export default auth(async (req) => {
    const { pathname } = req.nextUrl;
    // Handle the sign-in route separately.
    if (pathname === "/auth/sign-in") {
        if (req.auth) {
            return Response.redirect(new URL("/", req.nextUrl.origin));
        }
        return;
    }

    // other routes must be authenticated
    if (!req.auth) {
        const newUrl = new URL("auth/sign-in", req.nextUrl.origin);
        return Response.redirect(newUrl);
    }

    // don't check permission for home page
    if (pathname === "/") {
        return;
    }

    const segments = pathname.split("/").filter(Boolean);

    if (segments.length === 0) {
        return;
    }

    if (segments.length === 1) {
        const resource = segments[0].toLowerCase();
        const neededPermission = `view:${resource}`;

        const hasPermission = permissions.some(
            (p) => p.name.toLowerCase() === neededPermission.toLowerCase()
        );

        if (!hasPermission) {
            return new Response("Not Found", { status: 404 });
        }
    } else if (segments.length === 2) {
        const secondPart = segments[1].toLowerCase().replace(/-/g, ":");

        const hasPermission = permissions.some(
            (p) => p.name.toLowerCase() === secondPart
        );

        if (!hasPermission) {
            return new Response("Not Found", { status: 404 });
        }
    } else {
        return new Response("Not Found", { status: 404 });
    }
});

export const config = {
    // Exclude Next.js internals, API routes, favicon, and any file with an extension
    // so images, fonts, etc. aren't intercepted by this middleware.
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
