"use client";

import { useTranslation } from "react-i18next";
import RegisterFormSubmit from "./registerFormSubmit";
import TextInput from "./textInput";
import { useFormState } from "react-dom";
import { useEffect, useState } from "react";
import ToastMessage from "../ErrorElements/toastMessage";

export default function ActionForm({ action, className, type, button }) {
    const [state, formAction] = useFormState(action, {
        email: null,
        password: null,
        id: null,
    });
    const { t } = useTranslation();

    // Functionality to refresh the errors
    const [getErr, setErr] = useState("");
    const [getTimeOut, setTimeOut] = useState(null);
    useEffect(() => {
        setErr(state);
        if (state?.unexpected && !getTimeOut) {
            setTimeOut(
                setTimeout(() => {
                    setErr("");
                    setTimeOut(null);
                }, 3000)
            );
        }
    }, [state?.id]);
    //function to refresh the email error
    function updateErrEmail() {
        setErr({ email: "", password: getErr.password });
    }
    //function to refresh the password error
    function updateErrPass() {
        setErr({ email: getErr.email, password: "" });
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
        inputs = "";
    }
    return (
        <>
            {state?.unexpected ? (
                <ToastMessage message={t(getErr.unexpected)} setErr={setErr} />
            ) : (
                ""
            )}
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
