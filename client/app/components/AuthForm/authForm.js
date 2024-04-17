import styles from "./authForm.module.css";
import initTranslations from "@/app/i18n";
import Link from "next/link";
import BrandIcons from "../SVGIcons/brandIcons";
import ActionForm from "./actionForm";

export default async function AuthForm({ action, type, params, i18n }) {
    const { t } = await initTranslations(params.locale, i18n);

    let button = "";
    let title = "";
    let redirect_link = "";

    let terms_n_conditions = (
        <p className={styles.terms_n_conditions}>
            {t("authenticate:terms_p")}{" "}
            <Link href="#">{t("authenticate:terms")}</Link>{" "}
            {t("authenticate:and")}{" "}
            <Link href="#">{t("authenticate:privacy")}</Link>.
        </p>
    );

    // set the content of the page depending on the type of page Login Signup and Forgot Pass
    if (type == "login") {
        button = t("authenticate:login");
        title = t("authenticate:login_title");
        redirect_link = (
            <p className={styles.redirect_link}>
                {t("authenticate:no_account")}{" "}
                <Link href="/dashboard/signup">
                    {t("authenticate:go_signup")}
                </Link>
            </p>
        );
        terms_n_conditions = (
            <>
                <Link
                    className={styles.forgot_password}
                    href="/dashboard/password">
                    {t("authenticate:forgot_pass")}
                </Link>
                {terms_n_conditions}
            </>
        );
    } else if (type == "signup") {
        button = t("authenticate:signup");
        title = t("authenticate:signup_title");
        redirect_link = (
            <p className={styles.redirect_link}>
                {t("authenticate:already_signup")}{" "}
                <Link href="/dashboard/login">
                    {t("authenticate:go_to_login")}
                </Link>
            </p>
        );
    } else if (type == "password") {
        terms_n_conditions = "";
        button = t("authenticate:forgot_button");
        title = t("authenticate:forgot_title");
        redirect_link = (
            <p className={styles.redirect_link}>
                <Link href="/dashboard/login">
                    {t("authenticate:go_to_login")}
                </Link>
            </p>
        );
    }
    return (
        <div className={styles.formContainer}>
            <div className={styles.title}>
                <p>{title}</p>
            </div>
            {type == "password" ? (
                <p>{t("authenticate:forgot_desc")}</p>
            ) : (
                <>
                    <div className={styles.socialBtns}>
                        <button className={styles.button_generic}>
                            <span>
                                <BrandIcons type="google" size="18" />
                            </span>
                            {t("authenticate:continue_with", {
                                appname: "Google",
                            })}
                        </button>
                        <button className={styles.button_generic}>
                            <span>
                                <BrandIcons type="facebook" size="18" />
                            </span>
                            {t("authenticate:continue_with", {
                                appname: "Facebook",
                            })}
                        </button>
                        <button className={styles.button_generic}>
                            <span>
                                <BrandIcons type="apple" size="18" />
                            </span>
                            {t("authenticate:continue_with", {
                                appname: "Apple",
                            })}
                        </button>
                    </div>
                    <hr></hr>
                </>
            )}
            <ActionForm
                action={action}
                className={styles.form}
                type={type}
                button={button}
            />
            {terms_n_conditions}
            <hr></hr>
            {redirect_link}
        </div>
    );
}
