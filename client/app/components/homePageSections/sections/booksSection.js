import styles from "./booksSection.module.css";
import Image from "next/image";

export default function BooksSection() {
    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h6>Classic Stories for kids</h6>
                <h4>
                    Classic literature in a way that kids will love.
                </h4>
                <p>
                    Our app reimagines beloved classics like Moby Dick and The
                    Odysseus with age-appropriate language, making them
                    accessible and exciting for young audiences.
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
