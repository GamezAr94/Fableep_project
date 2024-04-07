"use client";
import AuthForm from "@/app/components/AuthForm/authForm";

import { login } from "@/lib/actions";

export default function SignupPage() {
    return <AuthForm action={login} type="login" />;
}
