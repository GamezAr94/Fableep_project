import Image from "next/image";
import styles from "./phoneImageSection.module.css";
export default function PhoneImageSection() {
    return (
        <div className={styles.phone_container}>
            <Image
                className={styles.phone_img}
                src="/images/general/phone_tmp.png"
                alt="the screenshot of the dashboard page with the info of the account"
                width={1456} // Adjust for your image's actual size
                height={816}
                priority={true}></Image>
        </div>
    );
}
