import { authAccessRoute } from "@/lib/actions";
import { redirect } from "next/navigation";

export default async function Test() {
    // authorize the access to the user
    await authAccessRoute("token_auth");
    return <div>Welcome back! </div>;
}
