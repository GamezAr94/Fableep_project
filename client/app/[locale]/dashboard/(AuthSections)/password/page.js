import AuthForm from "@/app/components/AuthForm/authForm";

import { forgot_password } from "@/lib/actions";

// Languages
const i18nNamespaces = ["authenticate"];

export default async function Password({ params }) {
    return (
        <AuthForm
            action={forgot_password}
            i18n={i18nNamespaces}
            type="password"
            params={params}
        />
    );
}
