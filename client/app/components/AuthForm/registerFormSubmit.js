"use client";

import { useFormStatus } from "react-dom";

export default function RegisterFormSubmit({ children, disabled }) {
    const { pending } = useFormStatus();
    return <button disabled={pending}>{pending ? disabled : children}</button>;
}
