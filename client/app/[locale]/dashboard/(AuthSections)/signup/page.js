import AuthForm from "@/app/components/AuthForm/authForm";

import { signup } from "@/lib/actions";

// Languages
const i18nNamespaces = ["authenticate"];

export default async function SignupPage({ params }) {
    return (
        <AuthForm
            action={signup}
            i18n={i18nNamespaces}
            type="signup"
            params={params}
        />
    );
}
