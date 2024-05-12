import { NextResponse } from "next/server";
import { i18nRouter } from "next-i18n-router";
import i18nConfig from "./i18nConfig";
import { isAuthorizedToAccess } from "./lib/actions";

export async function middleware(request) {
    const { pathname } = request.nextUrl;

    // 1. Check Authentication
    const isAuthenticated = await isAuthorizedToAccess();

    // 2. Run i18n Routing
    const localePathResult = i18nRouter(request, i18nConfig);

    // 3. Extract Locale (using x-next-i18n-router-locale header)
    const locale = localePathResult.headers.get("x-next-i18n-router-locale");

    // list of all our public routes with and without the lang prefix
    const public_routes = [
        `/`,
        `/dashboard/login`,
        `/dashboard/signup`,
        `/dashboard/password`,
        `/dashboard/verify_account`,
        `/${locale}`,
        `/${locale}/dashboard/login`,
        `/${locale}/dashboard/signup`,
        `/${locale}/dashboard/password`,
        `/${locale}/dashboard/verify_account`,
    ];

    // check if we are trying to access the public paths when the user is logged in
    if (public_routes.includes(pathname)) {
        if (isAuthenticated.jwt_status && isAuthenticated.verify_status) {
            return NextResponse.redirect(
                new URL(`/${locale}/dashboard`, request.url)
            );
        }
    } else {
        // check if the jwt and status are true for the private routes if not then redirect to the login page
        if (!isAuthenticated.jwt_status || !isAuthenticated.verify_status) {
            return NextResponse.redirect(
                new URL(`/${locale}/dashboard/login`, request.url)
            );
        }
    }

    // 5. If no redirect is needed, continue with i18n routing
    return localePathResult;
}

export const config = {
    matcher: "/((?!api|static|.*\\..*|_next).*)",
};
