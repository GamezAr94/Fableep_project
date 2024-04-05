import Image from "next/image";
import MenuHamburger from "./menuHamburger";

import logoImg from "@/public/fableep_logo.png";

import styles from "./header.module.css";
import Link from "next/link";

export default function Header() {
    return (
        <>
            <header className={styles.header}>
                <div>
                    <Link href="/" className={styles.logo_section}>
                        <Image
                            src={logoImg}
                            alt="this is the logo of the app"
                        />
                        Fableep
                    </Link>
                    <MenuHamburger />
                </div>
            </header>
        </>
    );
}
