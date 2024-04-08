import styles from "./textInput.module.css";

export default function TextInput({ type, name, placeholder, label }) {
    return (
        <div className={styles.input_wrap}>
            <p>{label}</p>
            <input type={type} name={name} placeholder={placeholder} />
        </div>
    );
}
