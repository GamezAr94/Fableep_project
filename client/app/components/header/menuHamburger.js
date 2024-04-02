"use client";
import Link from "next/link";
import styles from "./menuHamburger.module.css";
import { useState } from "react";
import LoginButton from "../loginButton/loginButton";

export default function MenuHamburger() {
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
                        <Link href="/">Home</Link>
                        <Link href="/">Pricing</Link>
                        <Link href="/">Resources</Link>
                        <Link href="/">Language</Link>
                        <div className={styles.signBtns}>
                            <LoginButton href="/" isLogin="true">
                                Login
                            </LoginButton>
                            <LoginButton href="/" type="false">
                                Start For Free
                            </LoginButton>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
