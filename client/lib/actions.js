"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import initTranslations from "@/app/i18n";

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
 * function to redirect user from public pages to the dashboard if logged in
 *
 * @param {string} token_name the name of the cookie
 * @returns boolean true if autorized false otherwise
 */
export async function redirectToPrivate(token_name, redirectPath = null) {
    const cookie_token = cookies().get(token_name || "token_auth");
    // we need the cookie value to run this code
    if (!cookie_token?.value || cookie_token?.value.trim().length <= 0) {
        if (redirectPath) {
            redirect(redirectPath);
        }
        return;
    }
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
    // redirect to the dashboard if we are logged in
    if (isAuthorized.verify_status && isAuthorized.jwt_status) {
        // we can only redirect if the path is not set because if it is set is because
        // we want to redirect from the dashboard
        if (!redirectPath) {
            // redirect from the login, signup, password to dashboard
            redirect("../dashboard");
        }
    } else {
        // if not authorized and we passed a new path then redirect to it
        if (redirectPath) {
            // redirect from the dashboard to a specific public page
            redirect(redirectPath);
        }
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

export async function resend_verification_email(prevState, formData) {
    // now we can re send the email
    const email_string = formData.get("email");
    if (email_string.trim() <= 0) {
        return { email: "authenticate:empty_email", id: Math.random() };
    } else if (!validateEmail(email_string)) {
        return { email: "authenticate:not_valid_email", id: Math.random() };
    }

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
                body: JSON.stringify({ email: email_string }),
            }
        );
        isSent = await res.json();
    } catch (error) {
        isSent.message = "Error sending the email";
    }

    isSent.id = Math.random();
    return isSent;
}

/**
 * this function will send the request to validate the user's account
 * @param {string} code the auth code passed in the email confirmation
 * @returns object with the status true if verified or false if failed and a message
 */
export async function verify_account(code) {
    const language = cookies().get("NEXT_LOCALE")?.value || "en";
    const i18n = ["authenticate"];
    const { t } = await initTranslations(language, i18n);
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
                    "accept-language": language,
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
            msg: t("authenticate:unexpected_server_err"),
        };
    }

    // if verified then redirect to the dashboard
    if (isActivated.isVerified) {
        redirect("../dashboard");
    }

    // we can return the response and handle it in the component
    return isActivated;
}
