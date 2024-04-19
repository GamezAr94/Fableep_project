import styles from "./toastMessage.module.css";

export default function ToastMessage({ message }) {
    const classType = message ? styles.show : styles.hide;
    return (
        <div className={`${styles.parent} ${classType}`}>
            {message ? <p>{message}</p> : ""}
        </div>
    );
}
