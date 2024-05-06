import AuthForm from "@/app/components/AuthForm/authForm";
import styles from "./page.module.css";

import Symbols from "@/app/components/SVGIcons/symbols";
import { login } from "@/lib/actions";
import AuthorizationHandler from "@/app/components/AuthorizationHandler/authorizationHandler";

// Languages
const i18nNamespaces = ["authenticate"];

export default async function LoginPage({ params }) {
    return (
        <AuthorizationHandler isType="public" route="../dashboard">
            <div className={styles.main}>
                <AuthForm
                    action={login}
                    type="login"
                    i18n={i18nNamespaces}
                    params={params}
                />
                <div className={styles.splash}>
                    <Symbols type="reading-girl" size="400" />
                    <Symbols
                        type="blob-1"
                        size="550"
                        className={styles.behind}
                    />
                </div>
            </div>
        </AuthorizationHandler>
    );
}
