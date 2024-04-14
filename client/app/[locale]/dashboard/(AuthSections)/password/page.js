import AuthForm from "@/app/components/AuthForm/authForm";
import { redirect } from "next/navigation";
import styles from "./page.module.css";

import { authAccessRoute, forgot_password } from "@/lib/actions";
import Symbols from "@/app/components/SVGIcons/symbols";

// Languages
const i18nNamespaces = ["authenticate"];

export default async function Password({ params }) {
    const isAuth = await authAccessRoute("token_auth");
    // redirect the user to the Dashboard if already logged in
    if (isAuth) {
        return redirect("/dashboard");
    }
    return (
        <div className={styles.main}>
            <AuthForm
                action={forgot_password}
                i18n={i18nNamespaces}
                type="password"
                params={params}
            />
            <div className={styles.splash}>
                <Symbols type="reading-girl" size="400" />
                <Symbols type="blob-1" size="550" className={styles.behind} />
            </div>
        </div>
    );
}
