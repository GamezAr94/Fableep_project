"use client";
import styles from "./page.module.css";
import { signup } from "@/lib/actions";

export default function SignupPage() {
    return (
        <div>
            <div>Sign up</div>
            <div>
                <div>google</div>
                <div>Facebook</div>
                <div>Apple</div>
            </div>
            <form action={signup}>
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
                    <button>Sign up with email</button>
                </div>
                <p>terms of service</p>
            </form>
            <p>already signed up? go to login</p>
        </div>
    );
}
