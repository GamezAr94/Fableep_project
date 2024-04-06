"use client";
import styles from "./page.module.css";
import { login } from "@/lib/actions";

export default function SignupPage() {
    return (
        <div>
            <div>Log in</div>
            <div>
                <div>continue with google</div>
                <div>continue with Facebook</div>
                <div>continue with Apple</div>
            </div>
            <form action={login}>
                <input
                    type="text"
                    name="username"
                    placeholder="Enter your email..."
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Enter your password..."
                />
                <div>
                    <button>Login</button>
                </div>
                <p>forgot your password</p>
                <p>terms of service</p>
            </form>
            <p>dont have an account? sign up</p>
        </div>
    );
}
