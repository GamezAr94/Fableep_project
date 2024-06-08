import styles from "./benefitsSection.module.css";

export default function BenefitsSection() {
    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h6>All The Benefits</h6>
                <h4>Explore all Fableep has to offer.</h4>
            </div>
            <div className={styles.benefits_container}>
                <div>
                    <div className={styles.icon}>icon</div>
                    <div className={styles.desc}>
                        <p>Unique Stories</p>
                    </div>
                </div>
                <div>
                    <div className={styles.icon}>icon</div>
                    <div className={styles.desc}>
                        <p>Biographies</p>
                    </div>
                </div>
                <div>
                    <div className={styles.icon}>icon</div>
                    <div className={styles.desc}>
                        <p>Classic Stories</p>
                    </div>
                </div>
                <div>
                    <div className={styles.icon}>icon</div>
                    <div className={styles.desc}>
                        <p>Learning Tools</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
