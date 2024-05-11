"use client";
import { useTranslation } from "react-i18next";
import LoginButton from "../inputs/loginButton";
import styles from "./menuDesktop.module.css";
import Link from "next/link";
import DropdownMenu from "./dropdownMenu";
import LanguageSelector from "./languageSelector";

export default function MenuDesktop({ isAuthorized, params }) {
    const { t } = useTranslation();
    // by default we will show the login and signup buttons
    let action_btn = (
        <>
            <LoginButton href="/dashboard/login" isLogin="true">
                {t("publicMenu:login")}
            </LoginButton>
            <LoginButton href="/dashboard/signup" isLogin="false">
                {t("publicMenu:start_for_free")}
            </LoginButton>
        </>
    );
    // but if the user is active we can show the button to access to their account
    // TODO we need to implement the i18n
    if (isAuthorized.jwt_status && isAuthorized.verify_status) {
        action_btn = (
            <LoginButton href="/dashboard" isLogin="false">
                {t("publicMenu:my_account")}
            </LoginButton>
        );
    }
    const lang_options = (
        <>
            <LanguageSelector language="en">
                {t("publicMenu:en")}
            </LanguageSelector>
            <LanguageSelector language="es">
                {t("publicMenu:es")}
            </LanguageSelector>
            <LanguageSelector language="it">
                {t("publicMenu:it")}
            </LanguageSelector>
            <LanguageSelector language="fr">
                {t("publicMenu:fr")}
            </LanguageSelector>
            <LanguageSelector language="ko">
                {t("publicMenu:ko")}
            </LanguageSelector>
        </>
    );
    // TODO set the correct elements in the resources dropdown
    return (
        <div className={styles.container_menu}>
            <DropdownMenu label={params.locale} component={lang_options} />
            <div className={styles.division}></div>
            <div className={styles.middle_section}>
                <Link href="/">{t("publicMenu:pricing")}</Link>
                <DropdownMenu
                    label={t("publicMenu:resources")}
                    items={[
                        { label: "Home", url: "/" },
                        { label: "About Us", url: "/about" },
                        { label: "Contact", url: "/contact" },
                    ]}
                />
            </div>
            <div className={styles.division}></div>
            <div className={styles.action_btns}>{action_btn}</div>
        </div>
    );
}
