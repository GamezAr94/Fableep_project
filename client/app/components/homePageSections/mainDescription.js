import LoginButton from "../inputs/loginButton";
import styles from "./mainDescription.module.css";

export default function MainDescription() {
    return (
        <div className={styles.description_section}>
            <main>
                <div className={styles.header_container}>
                    <h1>AI Bedtime Stories</h1>
                    <h2>Bedtime Stories for your kids that INSPIRE.</h2>
                </div>
                <h3>
                Start your free tiral and spark your child&apos;s imagination today!
                </h3>
                <LoginButton href="dashboard/signup" isLogin="false">
                    Try For Free
                </LoginButton>
            </main>
        </div>
    );
}
