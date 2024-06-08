import styles from "./motivateSection.module.css";
import ParallaxImages from "./parallaxImages";

export default function MotivateSection() {
    return (
        <div className={styles.container}>
            <ParallaxImages />
            <div className={styles.card}>
                <h6>Motivate and Inspire!</h6>
                <h4>Discover The Stories of Amazing People.</h4>
                <p>
                    Inspire your child with captivating stories about the lives
                    and achievements of people who changed the world. These
                    engaging tales are specially tailored for young minds.
                </p>
            </div>
        </div>
    );
}
