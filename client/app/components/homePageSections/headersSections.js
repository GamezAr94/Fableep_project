import styles from "./headersSections.module.css";
import React from "react";

export default function HeadersSections({ header, subheader, content }) {
    return (
        <div className={styles.container_header}>
            <p className={styles.subtitle}>{subheader}</p>
            <h4 className={styles.main_title}>{header}</h4>
            {content ? <p className={styles.description}>{content}</p> : ""}
        </div>
    );
}
