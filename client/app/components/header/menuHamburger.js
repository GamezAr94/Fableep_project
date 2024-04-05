"use client";
import Link from "next/link";
import styles from "./menuHamburger.module.css";
import { useState } from "react";
import LoginButton from "../loginButton/loginButton";
import { useTranslation } from "react-i18next";

export default function MenuHamburger() {
    const { t } = useTranslation();
    const [isClosed, setIsClosed] = useState(true);

    function toggleMenu() {
        setIsClosed(!isClosed);
    }

    return (
        <>
            <div className={styles.menuHamburger} onClick={toggleMenu}>
                <div
                    className={`${styles.menuIcon} ${
                        isClosed ? "" : styles.closeIcon
                    }`}></div>
            </div>
            <div
                className={`${styles.menuContainer} ${
                    isClosed ? styles.collapsed : ""
                }`}>
                <div className={styles.backdrop} onClick={toggleMenu}></div>
                <div className={styles.menuOptions}>
                    <div>
                        <Link href="/">{t("publicMenu:home")}</Link>
                        <Link href="/">{t("publicMenu:pricing")}</Link>
                        <Link href="/">{t("publicMenu:resources")}</Link>
                        <Link href="/">{t("publicMenu:language")}</Link>
                        <div className={styles.signBtns}>
                            <LoginButton
                                onClick={toggleMenu}
                                href="/dashboard/login"
                                isLogin="true">
                                {t("publicMenu:login")}
                            </LoginButton>
                            <LoginButton
                                href="/dashboard/signup"
                                onClick={toggleMenu}
                                isLogin="false">
                                {t("publicMenu:start_for_free")}
                            </LoginButton>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
