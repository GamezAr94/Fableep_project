import Image from "next/image";
import MenuHamburger from "./menuHamburger";

import logoImg from "@/assets/fableep_logo.png";

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
                            sizes="(max-width: 768px) 50px, (max-width: 1200px) 5vw, 3vw"
                        />
                        Fableep
                    </Link>
                    <MenuHamburger />
                </div>
            </header>
        </>
    );
}
