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
    const rawData = {
        email: formData.get("email"),
        password: formData.get("password"),
    };

    /*
    // validate the form before sending it to the backend
    const errors = validateFormInput(rawData);
    if (errors) {
        return errors;
    }
    */

    //await addTimeOut();

    // send the request to the backend
    try {
        const res = await fetch(
            `${process.env.IP}/${process.env.API}/${process.env.VERSION}/signup`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "accept-language":
                        cookies().get("NEXT_LOCALE")?.value || "en",
                },
                body: JSON.stringify(rawData),
            }
        );
        const data = await res.json();
        if (data.unexpected) {
            // set any unexpected error such as the email was not sent
            let errors = { unexpected: data.unexpected, id: Math.random() };
            return errors;
        } else if (data.errors) {
            // any validation error such as email is empty
            data.errors.id = Math.random();
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
            let errors = { unexpected: "", id: Math.random() };
            errors.unexpected = "authenticate:unexpected_server_err";
            return errors;
        }
    } catch (err) {
        let errors = { unexpected: "", id: Math.random() };
        errors.unexpected = "authenticate:unexpected_server_err";
        return errors;
    }

    // if we are here that means that the signup was successfully
    // TODO instead of redirect to the dashboard send them to check their email
    redirect("/dashboard");
}

/**
 * function that will perform the login process
 *
 * @param {object} formData an object containing the email and password
 * @returns
 */
export async function login(prevState, formData) {
    const rawData = {
        email: formData.get("email"),
        password: formData.get("password"),
    };

    // validate the form before sending it to the backend
    const errors = validateFormInput(rawData);
    if (errors) {
        return errors;
    }

    //await addTimeOut();

    // send the request to the backend
    try {
        const res = await fetch(
            `${process.env.IP}/${process.env.API}/${process.env.VERSION}/login`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "accept-language":
                        cookies().get("NEXT_LOCALE")?.value || "en",
                },
                body: JSON.stringify(rawData),
            }
        );
        const data = await res.json();
        if (data.errors) {
            data.errors.id = Math.random();
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
            let errors = { unexpected: "", id: Math.random() };
            errors.unexpected = "authenticate:unexpected_server_err";
            return errors;
        }
    } catch (err) {
        let errors = { unexpected: "", id: Math.random() };
        errors.unexpected = "authenticate:unexpected_server_err";
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

// TODO add this functionality for the password page
export async function forgot_password(prevState, formData) {
    addTimeOut();
}

/**
 * This function will validate the data received from the form
 *
 * @param {object} rawData this object accepts {email: '', password: ''}
 * @returns the object {email: '', password: '', id: ''} the id will help
 *          to refresh the useState
 */
function validateFormInput(rawData) {
    // Doing the client validation before sending the data to the server
    const errors = { email: null, password: null, id: null };
    if (rawData.email.trim() <= 0) {
        errors.email = "authenticate:empty_email";
    } else if (!validateEmail(rawData.email)) {
        errors.email = "authenticate:not_valid_email";
    }
    if (!validatePassword(rawData.password)) {
        errors.password = "authenticate:min_password";
    }
    if (errors.email || errors.password) {
        errors.id = Math.random();
        return errors;
    }
}
/**
 * This function will validate a string as an email
 *
 * @param {string} email the string to validate as an email
 * @returns TRUE if valid FALSE otherwise
 */
function validateEmail(email) {
    // Regular expression to validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
/**
 * This function will validate a string as a valid password
 *
 * @param {string} email the string to validate as a valid password
 * @returns TRUE if greater or equals than 6 FALSE otherwise
 */
function validatePassword(password) {
    // Check if password is a string and has minimum length of 6 characters
    return typeof password === "string" && password.length >= 6;
}

// TODO temporal function to add some timeOut and test the loading functionalities
// Simulate loading status for 2 seconds
async function addTimeOut(sec = 2) {
    await new Promise((resolve) => setTimeout(resolve, sec * 1000));
}
