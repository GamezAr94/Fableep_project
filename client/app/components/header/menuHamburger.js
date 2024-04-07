"use client";
import Link from "next/link";
import styles from "./menuHamburger.module.css";
import { useState } from "react";
import LoginButton from "../inputs/loginButton";
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
                    className={`${styles.menuIcon} 
                        isClose ? "" : styles.closeIcon
                    }`}></div>
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
                        <li>
                            <Link onClick={toggleMenu} href="/">
                                {t("publicMenu:language")}
                            </Link>
                        </li>
                        <hr></hr>
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
                    </ul>
                </nav>
            </div>
        </>
    );
}
