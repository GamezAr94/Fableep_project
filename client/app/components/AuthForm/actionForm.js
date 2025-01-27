"use client";

import { useTranslation } from "react-i18next";
import RegisterFormSubmit from "./registerFormSubmit";
import TextInput from "./textInput";
import { useFormState } from "react-dom";
import { useEffect, useState } from "react";
import { Slide, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ActionForm({ action, className, type, button }) {
    const { t } = useTranslation();

    const [state, formAction] = useFormState(action, {
        email: null,
        password: null,
        id: null,
    });

    // Functionality to display the password and menu errors
    const [getErr, setErr] = useState("");

    // hook to show ONLY the server error
    useEffect(() => {
        if (state?.unexpected) {
            // show any error created by any problem of validation
            toast.error(t(state.unexpected), {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Slide,
            });
        } else if (state?.message) {
            // show the message for the verification email
            if (state.isSent) {
                toast.success(state.message, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Slide,
                });
            } else {
                toast.error(state.message, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Slide,
                });
            }
        }
        // we need to set the password and email in another hook because we cannot
        // modify the values from the useFormState hook
        setErr(state);
    }, [state?.id]);

    //function to clear the email error
    function updateErrEmail() {
        setErr({ email: "", password: getErr?.password });
    }
    //function to clear the password error
    function updateErrPass() {
        setErr({ email: getErr?.email, password: "" });
    }

    let inputs = (
        <>
            <TextInput
                type="text"
                label={t("authenticate:email")}
                name="email"
                error={getErr?.email ? `${t(getErr.email)}` : ""}
                updateError={updateErrEmail}
                placeholder={t("authenticate:enter_email")}
            />
            <TextInput
                type="password"
                name="password"
                label={t("authenticate:password")}
                error={getErr?.password ? `${t(getErr.password)}` : ""}
                updateError={updateErrPass}
                placeholder={t("authenticate:enter_pass")}
            />
        </>
    );
    if (type === "password") {
        inputs = (
            <TextInput
                type="text"
                label={t("authenticate:email")}
                name="email"
                error={getErr?.email ? `${t(getErr.email)}` : ""}
                updateError={updateErrEmail}
                placeholder={t("authenticate:enter_email")}
            />
        );
    } else if (type === "verification") {
        inputs = (
            <TextInput
                type="text"
                label={t("authenticate:email")}
                name="email"
                error={getErr?.email ? `${t(getErr.email)}` : ""}
                updateError={updateErrEmail}
                placeholder={t("authenticate:enter_email")}
            />
        );
    }
    return (
        <>
            <form action={formAction} className={className}>
                {inputs}
                <div>
                    <RegisterFormSubmit disabled={t("authenticate:submitting")}>
                        {button}
                    </RegisterFormSubmit>
                </div>
            </form>
        </>
    );
}
