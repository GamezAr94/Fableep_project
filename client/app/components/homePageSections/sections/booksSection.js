import styles from "./booksSection.module.css";
import Image from "next/image";

export default function BooksSection() {
    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h6>Motivate and Inpire</h6>
                <h4>Discover The Stories of Amazing People.</h4>
                <p>
                    Inspire your child with captivating stories about the lives
                    and achievements of people who changed the world. These
                    engaging tales are specially tailored for young minds.
                </p>
            </div>
            <div className={styles.td_carousel_container}>
                <Image
                    src="/images/general/bear_v2.png"
                    alt="A cute bear sleeping among books in a clear and tranquile night"
                    width={1456} // Adjust for your image's actual size
                    height={816}
                    quality={80}
                    loading="lazy"></Image>
                <Image
                    src="/images/general/bear_v2.png"
                    alt="A cute bear sleeping among books in a clear and tranquile night"
                    width={1456} // Adjust for your image's actual size
                    height={816}
                    quality={80}
                    loading="lazy"></Image>
                <Image
                    src="/images/general/bear_v2.png"
                    alt="A cute bear sleeping among books in a clear and tranquile night"
                    width={1456} // Adjust for your image's actual size
                    height={816}
                    quality={80}
                    loading="lazy"></Image>
                <Image
                    src="/images/general/bear_v2.png"
                    alt="A cute bear sleeping among books in a clear and tranquile night"
                    width={1456} // Adjust for your image's actual size
                    height={816}
                    quality={80}
                    loading="lazy"></Image>
            </div>
        </div>
    );
}
