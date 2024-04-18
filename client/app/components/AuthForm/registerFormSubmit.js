"use client";
import styles from "./registerFormSubmit.module.css";

import { useFormStatus } from "react-dom";

export default function RegisterFormSubmit({ children, disabled }) {
    const { pending } = useFormStatus();
    return (
        <button className={pending ? styles.disabled : ""} disabled={pending}>
            {pending ? disabled : children}
        </button>
    );
}
