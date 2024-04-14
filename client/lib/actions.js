"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

// function that will perform the signup process
export async function signup(formData) {
    // TODO: do some validdation for password and email
    const rawData = {
        email: formData.get("email"),
        password: formData.get("password"),
    };

    // send the request to the backend
    try {
        const res = await fetch(
            `${process.env.IP}/${process.env.API}/${process.env.VERSION}/signup`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(rawData),
            }
        );
        const data = await res.json();
        if (data.errors) {
            // TODO display the errors in the client
            console.log(data.errors);
            return;
        } else if (data.user && data.jwt_token) {
            // set the cookie to authorize the user
            cookies().set({
                name: "token_auth",
                value: data.jwt_token,
                secure: process.env.NODE_ENV === true,
                httpOnly: true,
                path: "/",
                sameSite: "strict",
                maxAge: process.env.JWT_EXPIRES_IN * 24 * 60 * 60,
            });
            console.log(data);
        } else {
            // TODO unexpected error
            // if we are here then that means that there is an unhandled error
            // we dont have errors and we dont have the user and token
            console.log(data);
            console.log("UNEXPECTED ERROR!!!");
            return;
        }
    } catch (err) {
        // there is a problem with the server
        console.log(err.message);
        return;
    }

    // if we are here that means that the signup was successfully
    redirect("/dashboard");
}

// function that will perform the login process
export async function login(formData) {
    // TODO: do some validdation for password and email
    const rawData = {
        username: formData.get("email"),
        password: formData.get("password"),
    };

    // send the request to the backend
    try {
        const res = await fetch(
            `${process.env.IP}/${process.env.API}/${process.env.VERSION}/login`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(rawData),
            }
        );
        const data = await res.json();
        if (data.errors) {
            // TODO display the errors in the client
            console.log(data.errors);
            return;
        } else if (data.user && data.jwt_token) {
            // set the cookie to authorize the user
            cookies().set({
                name: "token_auth",
                value: data.jwt_token,
                secure: process.env.NODE_ENV === true,
                httpOnly: true,
                path: "/",
                sameSite: "strict",
                maxAge: process.env.JWT_EXPIRES_IN * 24 * 60 * 60,
            });
            console.log(data);
        } else {
            // TODO unexpected error
            // if we are here then that means that there is an unhandled error
            // we dont have errors and we dont have the user and token
            console.log(data);
            console.log("UNEXPECTED ERROR!!!");
            return;
        }
    } catch (err) {
        // there is a problem with the server
        console.log(err.message);
        return;
    }

    // if we are here that means that the signup was successfully
    redirect("/dashboard");
}

// function that will perform the login process
export async function forgot_password(formData) {
    console.log("forgot password");
}
