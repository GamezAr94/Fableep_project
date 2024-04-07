"use server";

import { redirect } from "next/navigation";

// function that will perform the signup process
export async function signup(formData) {
    // do some validdation of password and username
    const rawData = {
        username: formData.get("username"),
        password: formData.get("password"),
    };
    const res = await fetch(
        `http://localhost:8080/${process.env.API}/${process.env.VERSION}/signup`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(rawData),
        }
    );
    const data = await res.json();
    console.log(data);
    if (data.success) {
        redirect("/dashboard");
    }
}

// function that will perform the login process
export async function login(formData) {
    // do some validdation of password and username
    const rawData = {
        username: formData.get("username"),
        password: formData.get("password"),
    };
    const res = await fetch(
        `http://localhost:8080/${process.env.API}/${process.env.VERSION}/login`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(rawData),
        }
    );
    const data = await res.json();
    console.log(data);
    if (data.success) {
        redirect("/dashboard");
    }
}

// function that will perform the login process
export async function forgot_password(formData) {
    console.log("forgot password");
}
