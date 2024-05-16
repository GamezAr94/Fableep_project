import styles from "./page.module.css";

export default function Home() {
    return (
        <div className={styles.main_container}>
            <div className={styles.description_section}>
                <main>
                    <div className={styles.header_container}>
                        <h1>AI Story Generator</h1>
                        <h2>Create BEAUTIFUL bedtime stories for your kids.</h2>
                    </div>
                    <h3>
                        create good habits and spend quality time with your
                        loved ones.
                    </h3>
                    <div>desc</div>
                </main>
            </div>
            <div className={styles.imagine_section}>
                <div className={styles.image_banner}>img</div>
            </div>
            <div className={styles.phone_container}>
                <div className={styles.phone_img}>phone</div>
            </div>
            <div className={styles.news_container}>news</div>
        </div>
    );
}
