import { authAccessRoute } from "@/lib/actions";

export default async function Test() {
    // ! fix this one because when I login I am being redirected to the login page instead of staying in the dashboard page
    // authorize the access to the user
    //await authAccessRoute("token_auth");

    return <div>Welcome back! </div>;
}
