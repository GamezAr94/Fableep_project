import { redirectToPrivate } from "@/lib/actions";

export default async function Page() {
    // redirect the user to the Dashboard if already logged in
    await redirectToPrivate("token_auth", "/dashboard/login");
    return <div>Welcome back! </div>;
}
