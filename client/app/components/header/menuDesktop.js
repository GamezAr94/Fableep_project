"use client";
import { useTranslation } from "react-i18next";
import LoginButton from "../inputs/loginButton";
import styles from "./menuDesktop.module.css";
import Link from "next/link";

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
    return (
        <div className={styles.container_menu}>
            <div>{params.locale}</div>
            <div className={styles.division}></div>
            <div>
                <Link href="/">{t("publicMenu:pricing")}</Link>
                <div>{t("publicMenu:resources")}</div>
            </div>
            <div className={styles.division}></div>
            <div className={styles.action_btns}>{action_btn}</div>
        </div>
    );
}
