import styles from "./authForm.module.css";
import TextInput from "@/app/components/AuthForm/textInput";
import Link from "next/link";

export default function AuthForm({ action, type }) {
    let button = "";
    let title = "Incorrect type";
    let redirect_link = "Incorrect types";
    let terms_n_conditions = "";
    if (type == "login") {
        button = "Log in";
        title = "Log in";
        redirect_link = (
            <p className={styles.redirect_link}>
                Don&apos;t have an account?{" "}
                <Link href="/dashboard/signup">Go to sign up</Link>
            </p>
        );
        terms_n_conditions = (
            <>
                <Link
                    className={styles.forgot_password}
                    href="/dashboard/password">
                    Forgot your password?
                </Link>
                <p className={styles.terms_n_conditions}>
                    By continuing with Google, Apple, or Email, you agree to
                    Fableep’s <Link href="#">Terms of Service</Link> and{" "}
                    <Link href="#">Privacy Policy</Link>.
                </p>
            </>
        );
    } else if (type == "signup") {
        button = "Sign up";
        title = "Sign up";
        redirect_link = (
            <p className={styles.redirect_link}>
                Already signed up?{" "}
                <Link href="/dashboard/login">Go to login</Link>
            </p>
        );
        terms_n_conditions = (
            <p className={styles.terms_n_conditions}>
                By continuing with Google, Apple, or Email, you agree to
                Fableep’s <Link href="#">Terms of Service</Link> and{" "}
                <Link href="#">Privacy Policy</Link>.
            </p>
        );
    } else if (type == "password") {
        button = "Reset my password";
        title = "Forgot your password?";
        redirect_link = (
            <p className={styles.redirect_link}>
                <Link href="/dashboard/login">Go to login</Link>
            </p>
        );
    }
    return (
        <div className={styles.formContainer}>
            <div className={styles.title}>
                <p>{title}</p>
            </div>
            {type == "password" ? (
                <p>
                    To reset your password, please enter the email address of
                    your Fableep account.
                </p>
            ) : (
                <>
                    <div className={styles.socialBtns}>
                        <button className={styles.button_generic}>
                            <span>G</span>
                            Continue with Google
                        </button>
                        <button className={styles.button_generic}>
                            <span>F</span>
                            Continue with Facebook
                        </button>
                        <button className={styles.button_generic}>
                            <span>A</span>
                            Continue with Apple
                        </button>
                    </div>
                    <hr></hr>
                </>
            )}
            <form action={action} className={styles.form}>
                <TextInput
                    type="text"
                    name="username"
                    placeholder="Enter your email..."
                />
                {type == "password" ? (
                    ""
                ) : (
                    <TextInput
                        type="password"
                        name="password"
                        placeholder="Enter your password..."
                    />
                )}
                <div>
                    <button>{button}</button>
                </div>
            </form>
            {terms_n_conditions}
            <hr></hr>
            {redirect_link}
        </div>
    );
}
