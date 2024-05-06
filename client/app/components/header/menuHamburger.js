"use client";
import Link from "next/link";
import styles from "./menuHamburger.module.css";
import { useState } from "react";
import LoginButton from "../inputs/loginButton";
import { useTranslation } from "react-i18next";
import LanguageSelector from "./languageSelector";
import Symbols from "../SVGIcons/symbols";

export default function MenuHamburger({ isAuthorized }) {
    const { t } = useTranslation();
    const [isClosed, setIsClosed] = useState(true);
    const [isSubMenuLangClosed, setSubMenuLangClosed] = useState(true);

    function toggleMenu() {
        setIsClosed(!isClosed);
    }
    function showSubMenu() {
        setSubMenuLangClosed(!isSubMenuLangClosed);
    }

    // by default we will show the login and signup buttons
    let action_btn = (
        <ul className={styles.signBtns}>
            <li>
                <LoginButton
                    onClick={toggleMenu}
                    href="/dashboard/login"
                    isLogin="true">
                    {t("publicMenu:login")}
                </LoginButton>
            </li>
            <li>
                <LoginButton
                    href="/dashboard/signup"
                    onClick={toggleMenu}
                    isLogin="false">
                    {t("publicMenu:start_for_free")}
                </LoginButton>
            </li>
        </ul>
    );
    // but if the user is active we can show the button to access to their account
    // TODO we need to implement the i18n
    if (isAuthorized.jwt_status && isAuthorized.verify_status) {
        action_btn = (
            <ul className={styles.signBtns}>
                <li>
                    <LoginButton
                        href="/dashboard"
                        onClick={toggleMenu}
                        isLogin="false">
                        Your Account
                    </LoginButton>
                </li>
            </ul>
        );
    }

    return (
        <>
            <div className={styles.menuHamburger} onClick={toggleMenu}>
                <div
                    className={`${styles.menuIcon} 
                        ${isClosed ? "" : styles.closeIcon}`}></div>
            </div>
            <div
                className={`${styles.menuContainer} ${
                    isClosed ? styles.collapsed : ""
                }`}>
                <div className={styles.backdrop} onClick={toggleMenu}></div>
                <nav className={styles.menuOptions}>
                    <ul className={styles.first_level_list}>
                        <li>
                            <Link onClick={toggleMenu} href="/">
                                {t("publicMenu:home")}
                            </Link>
                        </li>
                        <li>
                            <Link onClick={toggleMenu} href="/">
                                {t("publicMenu:pricing")}
                            </Link>
                        </li>
                        <li>
                            <Link onClick={toggleMenu} href="/">
                                {t("publicMenu:resources")}
                            </Link>
                        </li>
                        <li
                            className={`${styles.languages} ${
                                isSubMenuLangClosed ? "" : styles.active
                            }`}
                            onClick={showSubMenu}>
                            {t("publicMenu:language")}
                            <span
                                className={
                                    isSubMenuLangClosed ? styles.closed : ""
                                }>
                                <Symbols type="arrow" size="40" />
                            </span>
                        </li>
                        <ul
                            className={`${styles.submenu} ${
                                isSubMenuLangClosed ? styles.closed : ""
                            }`}>
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
                        </ul>
                        <hr></hr>
                        {action_btn}
                    </ul>
                </nav>
            </div>
        </>
    );
}
