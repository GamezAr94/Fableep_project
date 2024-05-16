import styles from "./mainDescription.module.css";

export default function MainDescription() {
    return (
        <div className={styles.description_section}>
            <main>
                <div className={styles.header_container}>
                    <h1>AI Story Generator</h1>
                    <h2>Create BEAUTIFUL bedtime stories for your kids.</h2>
                </div>
                <h3>
                    create good habits and spend quality time with your loved
                    ones.
                </h3>
                <div>desc</div>
            </main>
        </div>
    );
}
