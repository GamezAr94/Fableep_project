import { useState } from "react";
import styles from "./dropdownMenu.module.css";
import Link from "next/link";

export default function DropdownMenu({ label, items, component }) {
    const [isOpen, setIsOpen] = useState(false);

    const contentToRender =
        component ||
        items.map((item, index) => (
            <li key={index}>
                <Link href={item.url}>{item.label}</Link>
            </li>
        ));

    return (
        <div
            className={styles.dropdownContainer}
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}>
            <div className={styles.dropdownLabel}>
                {label}
                <span className={styles.arrow}></span>
            </div>

            {isOpen && (
                <ul className={styles.dropdownList}>{contentToRender}</ul>
            )}
        </div>
    );
}
