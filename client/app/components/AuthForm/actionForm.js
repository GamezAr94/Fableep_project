"use client";

import { useTranslation } from "react-i18next";
import RegisterFormSubmit from "./registerFormSubmit";
import TextInput from "./textInput";
import { useFormState } from "react-dom";
import { useEffect, useState } from "react";

export default function ActionForm({ action, className, type, button }) {
    const [state, formAction] = useFormState(action, {
        email: null,
        password: null,
        id: null,
    });
    const { t } = useTranslation();

    // Functionality to refresh the errors
    const [getErr, setErr] = useState(state.email);
    useEffect(() => {
        setErr(state);
    }, [state.id]);
    //function to refresh the email error
    function updateErrEmail() {
        setErr({ email: "", password: getErr.password });
    }
    //function to refresh the password error
    function updateErrPass() {
        setErr({ email: getErr.email, password: "" });
    }

    return (
        <>
            {state?.unexpected ? state.unexpected : ""}
            <form action={formAction} className={className}>
                <TextInput
                    type="text"
                    label={t("authenticate:email")}
                    name="email"
                    error={getErr?.email ? `${t(getErr.email)}` : ""}
                    updateError={updateErrEmail}
                    placeholder={t("authenticate:enter_email")}
                />
                {type == "password" ? (
                    ""
                ) : (
                    <TextInput
                        type="password"
                        name="password"
                        label={t("authenticate:password")}
                        error={getErr?.password ? `${t(getErr.password)}` : ""}
                        updateError={updateErrPass}
                        placeholder={t("authenticate:enter_pass")}
                    />
                )}
                <div>
                    <RegisterFormSubmit disabled={t("authenticate:submitting")}>
                        {button}
                    </RegisterFormSubmit>
                </div>
            </form>
        </>
    );
}