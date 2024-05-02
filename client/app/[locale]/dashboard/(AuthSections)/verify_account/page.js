import AuthForm from "@/app/components/AuthForm/authForm";
import styles from "./page.module.css";

import { resend_verification_email } from "@/lib/actions";

import Symbols from "@/app/components/SVGIcons/symbols";
import Validate_account from "./validate_account";

// Languages
const i18nNamespaces = ["authenticate"];

export default async function Page({ params }) {
    return (
        <Validate_account>
            {
                <div className={styles.main}>
                    <AuthForm
                        action={resend_verification_email}
                        i18n={i18nNamespaces}
                        type="verification"
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
            }
        </Validate_account>
    );
}
