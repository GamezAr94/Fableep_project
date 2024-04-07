import Link from "next/link";
import styles from "./loginButton.module.css";

export default function LoginButton({ href, isLogin, onClick, children }) {
    // setting the class of the button depending on if it is login or signup
    let classButton = isLogin === "true" ? styles.loginBtn : styles.signupBtn;
    return (
        <Link onClick={onClick} href={href} className={classButton}>
            {children}
        </Link>
    );
}
