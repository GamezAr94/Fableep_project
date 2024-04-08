import AuthForm from "@/app/components/AuthForm/authForm";
import TranslationsProvider from "@/app/components/translationsProvider";
import initTranslations from "@/app/i18n";

import { login } from "@/lib/actions";

// Languages
const i18nNamespaces = ["authenticate"];

export default async function SignupPage({ params }) {
    return (
        <AuthForm
            action={login}
            type="login"
            i18n={i18nNamespaces}
            params={params}
        />
    );
}
