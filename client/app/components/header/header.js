import Image from "next/image";
import MenuHamburger from "./menuHamburger";

import logoImg from "@/public/fableep_logo_compress.png";

import styles from "./header.module.css";
import Link from "next/link";

export default function Header({ menuType }) {
    let menu = "";
    let logo = "";
    if (menuType === "public") {
        menu = <MenuHamburger />;
        logo = (
            <Link href="/" className={styles.logo_section}>
                <Image src={logoImg} alt="this is the logo of the app" />
                Fableep
            </Link>
        );
    } else if (menuType === "dashboard") {
        menu = "Other";
        logo = (
            <Link href="/dashboard" className={styles.logo_section}>
                <Image src={logoImg} alt="this is the logo of the app" />
            </Link>
        );
    } else {
        menu = "";
        logo = (
            <Link href="/" className={styles.logo_section}>
                <Image src={logoImg} alt="this is the logo of the app" />
                Fableep
            </Link>
        );
    }

    return (
        <>
            <header className={styles.header}>
                <div>
                    {logo}
                    {menu}
                </div>
            </header>
        </>
    );
}
