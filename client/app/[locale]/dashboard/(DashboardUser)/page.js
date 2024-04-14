import { authAccessRoute } from "@/lib/actions";
import { redirect } from "next/navigation";

export default async function Test() {
    const isAuth = await authAccessRoute("token_auth");
    // redirect the user to the login page if NOT authorized
    if (!isAuth) {
        return redirect("/dashboard/login");
    }
    return <div>Welcome back! </div>;
}
