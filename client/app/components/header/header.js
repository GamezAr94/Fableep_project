import Image from "next/image";
import logoImg from "@/assets/fableep_logo.png";

import styles from "./header.module.css";

export default function Header() {
    return (
        <>
            <header className={styles.header}>
                <div>
                    <div className={styles.logo_section}>
                        <Image
                            src={logoImg}
                            alt="this is the logo of the app"
                            sizes="(max-width: 768px) 50px, (max-width: 1200px) 5vw, 3vw"
                        />
                        <p>Fableep</p>
                    </div>
                    <div>menu</div>
                </div>
            </header>
        </>
    );
}
