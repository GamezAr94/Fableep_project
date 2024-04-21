import AuthForm from "@/app/components/AuthForm/authForm";
import { redirect } from "next/navigation";
import styles from "./page.module.css";

import { authAccessRoute, forgot_password } from "@/lib/actions";
import Symbols from "@/app/components/SVGIcons/symbols";

// Languages
const i18nNamespaces = ["authenticate"];

export default async function password({ params }) {
    //TODO fix this
    /*
    // authorize the access to the user
    const status = await authAccessRoute("token_auth", '', '');
    console.log(status);
    */
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
