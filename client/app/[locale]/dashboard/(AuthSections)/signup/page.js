import AuthForm from "@/app/components/AuthForm/authForm";
import styles from "./page.module.css";

import { signup } from "@/lib/actions";
import Symbols from "@/app/components/SVGIcons/symbols";
import AuthorizationHandler from "@/app/components/AuthorizationHandler/authorizationHandler";

// Languages
const i18nNamespaces = ["authenticate"];

export default async function SignupPage({ params }) {
    return (
        <AuthorizationHandler isType="public" route="../dashboard">
            <div className={styles.main}>
                <AuthForm
                    action={signup}
                    i18n={i18nNamespaces}
                    type="signup"
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
