"use client";

import { useEffect, useState } from "react";
import EyeIcon from "../SVGIcons/eye";
import styles from "./textInput.module.css";

export default function TextInput({ type, name, placeholder, error, updateError, label }) {
    const [isShowPass, setShowPass] = useState(false);
    const [getInputState, setInputState] = useState({
        icon: "",
        inputType: null,
    });

    // Use Effect to show and hide the password text
    useEffect(() => {
        function showHidePass() {
            setShowPass(!isShowPass);
        }

        if (type == "password") {
            setInputState({
                icon: (
                    <span onClick={showHidePass} className={styles.icon}>
                        <EyeIcon type="closed" size="26" />
                    </span>
                ),
                inputState: "password",
            });
            if (isShowPass) {
                setInputState({
                    icon: (
                        <span onClick={showHidePass} className={styles.icon}>
                            <EyeIcon type="open" size="26" />
                        </span>
                    ),
                    inputState: "text",
                });
            } else {
                setInputState({
                    icon: (
                        <span onClick={showHidePass} className={styles.icon}>
                            <EyeIcon type="closed" size="26" />
                        </span>
                    ),
                    inputState: "password",
                });
            }
        }
    }, [isShowPass]);

    return (
        <div>
            <div className={styles.input_wrap} onClick={updateError}>
                <p>{label}</p>
                {getInputState.icon}
                <input
                    type={getInputState ? getInputState.inputState : type}
                    name={name}
                    placeholder={placeholder}
                />
            </div>
            <p>{error}</p>
        </div>
    );
}
