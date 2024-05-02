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

    // validate the form before sending it to the backend
    const errors = validateFormInput(rawData);
    if (errors) {
        return errors;
    }

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

    // if we are here that means that the signup was successfully and we need to verify the account
    redirect("/dashboard/verify_account");
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
    return redirect("../dashboard");
}

/**
 * function to authorize the access to some routes
 *
 * @param {string} token_name the name of the cookie
 * @returns boolean true if autorized false otherwise
 */
export async function authAccessRoute(token_name) {
    const cookie_token = cookies().get(token_name || "token_auth");
    let isAuthorized = null;
    try {
        const res = await fetch(
            `${process.env.IP}/${process.env.API}/${process.env.VERSION}/auth-token`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "accept-language":
                        cookies().get("NEXT_LOCALE")?.value || "en",
                },
                body: JSON.stringify(cookie_token),
            }
        );
        isAuthorized = await res.json();
    } catch (err) {
        isAuthorized = null;
    }
    // if the email is not verified we need to send them to the verification page
    if (isAuthorized.verify_status === false) {
        redirect("/dashboard/verify_account");
    }
    // if the jwt is not valid then we need to send them to the login page
    if (isAuthorized.jwt_status === false) {
        redirect("/dashboard/login");
    }
    // if there is any other problem then we need to redirect the user to the login page
    if (isAuthorized === null) {
        redirect("/dashboard/login");
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
    return { isVerified: false, msg: "error validating the code" };
}

export async function resend_verification_email(email) {
    // todo Modify this to receive an email instead of the JWT
    const cookie_token = cookies().get("token_auth");
    // if they dont have the cookie set then this is not the right place
    if (!cookie_token) {
        redirect("/dashboard/login");
    }

    // now we can re send the email
    let isSent = { emailed: false, message: "no sent", id: 0 };
    try {
        const res = await fetch(
            `${process.env.IP}/${process.env.API}/${process.env.VERSION}/send_verification_email`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "accept-language":
                        cookies().get("NEXT_LOCALE")?.value || "en",
                },
                body: JSON.stringify(cookie_token),
            }
        );
        isSent = await res.json();
    } catch (error) {
        isSent.message = "Error sending the email";
    }

    return isSent;
}

/**
 * this function will send the request to validate the user's account
 * @param {string} code the auth code passed in the email confirmation
 * @returns object with the status true if verified or false if failed and a message
 */
export async function verify_account(code) {
    // prepare the returned value
    let isActivated = {
        isVerified: false,
        msg: "Authentication code not valid",
    };

    // verify the code
    if (!code) {
        return isActivated;
    }

    // remove any token in case was already logged in
    cookies().delete("token_auth");

    try {
        // if there is no code then do nothing
        const res = await fetch(
            `${process.env.IP}/${process.env.API}/${process.env.VERSION}/verify_email_account`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "accept-language":
                        cookies().get("NEXT_LOCALE")?.value || "en",
                },
                body: JSON.stringify({ code: code }),
            }
        );
        isActivated = await res.json();
        // if the user was not logged in but verified the account then we have to log the user in
        if (isActivated.isVerified && isActivated.jwt_token) {
            cookies().set({
                name: "token_auth",
                value: isActivated.jwt_token,
                secure: process.env.NODE_ENV === true,
                httpOnly: true,
                path: "/",
                sameSite: "strict",
                maxAge: process.env.JWT_EXPIRES_IN * 24 * 60 * 60,
            });
        }
    } catch (error) {
        // todo set proper message and add i18n
        isActivated = {
            isVerified: false,
            msg: "Error conencting to the server, please try latter",
        };
    }

    // if verified then redirect to the dashboard
    if (isActivated.isVerified) {
        redirect("../dashboard");
    }

    // we can return the response and handle it in the component
    return isActivated;
}
