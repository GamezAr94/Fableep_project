import AuthorizationHandler from "@/app/components/AuthorizationHandler/authorizationHandler";

export default async function Page() {
    return (
        <AuthorizationHandler isType="private" route="../dashboard/login">
            <div>Welcome back! </div>
        </AuthorizationHandler>
    );
}
