import AuthForm from "@/app/components/AuthForm/authForm";
import { forgot_password } from "@/lib/actions";

export default function Password() {
    return <AuthForm action={forgot_password} type="password" />;
}
