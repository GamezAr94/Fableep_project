import AuthForm from "@/app/components/AuthForm/authForm";
import styles from "./page.module.css";

import Symbols from "@/app/components/SVGIcons/symbols";
import { login, redirectToPrivate } from "@/lib/actions";

// Languages
const i18nNamespaces = ["authenticate"];

export default async function LoginPage({ params }) {
    // redirect the user to the Dashboard if already logged in
    await redirectToPrivate("token_auth");
    return (
        <div className={styles.main}>
            <AuthForm
                action={login}
                type="login"
                i18n={i18nNamespaces}
                params={params}
            />
            <div className={styles.splash}>
                <Symbols type="reading-girl" size="400" />
                <Symbols type="blob-1" size="550" className={styles.behind} />
            </div>
        </div>
    );
}
