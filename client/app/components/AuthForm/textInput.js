import styles from "./textInput.module.css";

export default function TextInput({ type, name, placeholder }) {
    return (
        <div className={styles.input_wrap}>
            <p>{type == "text" ? "Email:" : "Password:"}</p>
            <input type={type} name={name} placeholder={placeholder} />
        </div>
    );
}
