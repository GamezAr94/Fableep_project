"use client";

import { useTranslation } from "react-i18next";
import RegisterFormSubmit from "./registerFormSubmit";
import TextInput from "./textInput";
import { useFormState } from "react-dom";

export default function ActionForm({ action, className, type, button }) {
    const [state, formAction] = useFormState(action, {
        email: null,
        password: null,
    });
    const { t } = useTranslation();

    return (
        <>
            {state?.unexpected ? state.unexpected : ""}
            <form action={formAction} className={className}>
                {state?.email ? state.email : ""}
                <TextInput
                    type="text"
                    label={t("authenticate:email")}
                    name="email"
                    placeholder={t("authenticate:enter_email")}
                />
                {state?.password ? state.password : ""}
                {type == "password" ? (
                    ""
                ) : (
                    <TextInput
                        type="password"
                        name="password"
                        label={t("authenticate:password")}
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
