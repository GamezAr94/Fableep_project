"use client";
import AuthForm from "@/app/components/AuthForm/authForm";

import { signup } from "@/lib/actions";

export default function SignupPage() {
    return <AuthForm action={signup} type="signup" />;
}
