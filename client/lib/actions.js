"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

/**
 * function that will perform the signup process
 *
 * @param {object} formData the values from the form email and password
 * @returns
 */
export async function signup(prevState, formData) {
    // TODO: do some validdation for password and email
    const rawData = {
        email: formData.get("email"),
        password: formData.get("password"),
    };

    await addTimeOut();

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
            return data.errors;
        } else if (data.user && data.jwt_token) {
            // if we are here we need to set the cookie to authorize the user
            cookies().set({
                name: "token_auth",
                value: data.jwt_token,
                secure: process.env.NODE_ENV === true,
                httpOnly: true,
                path: "/",
                sameSite: "strict",
                maxAge: process.env.JWT_EXPIRES_IN * 24 * 60 * 60,
            });
        } else {
            // TODO server error
            let errors = { unexpected: "" };
            errors.unexpected = "unexpected error: please try again later";
            return errors;
        }
    } catch (err) {
        // TODO server error
        let errors = { unexpected: "" };
        errors.unexpected = "unexpected error: please try again later";
        return errors;
    }

    // if we are here that means that the signup was successfully
    redirect("/dashboard");
}

/**
 * function that will perform the login process
 *
 * @param {object} formData an object containing the email and password
 * @returns
 */
export async function login(prevState, formData) {
    // TODO: do some validdation for password and email
    const rawData = {
        username: formData.get("email"),
        password: formData.get("password"),
    };

    await addTimeOut();

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
            return data.errors;
        } else if (data.user && data.jwt_token) {
            // If success then set the cookie to authorize the user
            cookies().set({
                name: "token_auth",
                value: data.jwt_token,
                secure: process.env.NODE_ENV === true,
                httpOnly: true,
                path: "/",
                sameSite: "strict",
                maxAge: process.env.JWT_EXPIRES_IN * 24 * 60 * 60,
            });
        } else {
            // TODO server error
            let errors = { unexpected: "" };
            errors.unexpected = "unexpected error: please try again later";
            return errors;
        }
    } catch (err) {
        // TODO server error
        let errors = { unexpected: "" };
        errors.unexpected = "unexpected error: please try again later";
        return errors;
    }

    // if we are here that means that the signup was successfully
    redirect("/dashboard");
}

/**
 * function to authorize the access to some routes
 *
 * @param {string} token_name the name of the cookie
 * @returns boolean true if autorized false otherwise
 */
export async function authAccessRoute(token_name) {
    const cookie_token = cookies().get((token_name = "token_auth"));

    await addTimeOut();

    try {
        const res = await fetch(
            `${process.env.IP}/${process.env.API}/${process.env.VERSION}/auth-token`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(cookie_token),
            }
        );
        const data = await res.json();
        return data.status;
    } catch (err) {
        return false;
    }
}

// TODO temporal function to add some timeOut and test the loading functionalities
// Simulate loading status for 2 seconds
async function addTimeOut(sec = 2) {
    await new Promise((resolve) => setTimeout(resolve, sec * 1000));
}

// TODO add this functionality for the password page
export async function forgot_password(prevState, formData) {
    addTimeOut();
}
