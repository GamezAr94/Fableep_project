"use server";

import { isAuthorizedToAccess } from "@/lib/actions";
import { redirect } from "next/navigation";

export default async function AuthorizationHandler({
    children,
    isType,
    route,
}) {
    const isAuth = await isAuthorizedToAccess("token_auth");

    // if it is private we want to check that the jwt and status are true
    if (isType == "private") {
        if (!isAuth.jwt_status || !isAuth.verify_status) {
            // redirect to the route
            redirect(route);
        }
    } else if (isType == "public") {
        // if it is public we want to check that the status is verified to redirect to the dashboard
        if (isAuth.jwt_status && isAuth.verify_status) {
            // redirect to the route
            redirect(route);
        }
    }
    return <>{children}</>;
}
