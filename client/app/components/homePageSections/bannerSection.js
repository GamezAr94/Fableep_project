import Image from "next/image";
import styles from "./bannerSection.module.css";

export default function BannerSection() {
    return (
        <div className={styles.imagine_section}>
            <div className={styles.image_banner}>
                <Image
                    src="/images/general/bear_v2.png"
                    alt="A cute bear sleeping among books in a clear and tranquile night"
                    width={1456} // Adjust for your image's actual size
                    height={816}
                    priority={true}></Image>
                <div className={styles.rounded_mask_first}></div>
            </div>
        </div>
    );
}
