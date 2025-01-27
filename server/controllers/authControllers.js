const config = require("../config/config");

const User = require("../models/User");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const getMessage = require("../lib/getLanguage");
const { isEmail } = require("validator");

/**
 * Function to create and send the email to verify the user's account
 * @param {string} to the email address to send the email
 * @param {string} verification the verification code
 * @param {string} language the language to display the messages
 * @returns
 */
const emailHandler = async (to, verification, language) => {
    let response = { status: false, msg: "Not Executed" };
    let transporter = nodemailer.createTransport({
        host: config.email_host,
        port: config.email_port,
        secure: true,
        auth: {
            user: config.email_user,
            pass: config.email_password,
        },
    });

    // Construct the verification link
    const verificationLink = `http://localhost:3000/dashboard/verify_account?auth_code=${verification}`;

    // HTML content for the email
    const htmlContent = `
            <div>
                <h1>
                    ${getMessage("body_email_verification_title", language)}
                </h1>
                <p>
                    ${getMessage("body_email_verification", language)}
                </p>
                <a href="${verificationLink}">
                    ${getMessage("button_email_verify", language)}
                </a>
                <p>
                    ${getMessage("body_email_verification_footer", language)}
                </p>
                <p>- Fableep :) </p>
            </div>
        `;

    // Plain text content for the email
    const textContent = `
        ${getMessage("body_email_verification_title", language)}

        ${getMessage("body_email_verification", language)}
        ${verificationLink}

        ${getMessage("body_email_verification_footer", language)}
        - Fableep :)
    `;

    var mailOptions = {
        from: config.email_user,
        to: to,
        subject: getMessage("subject_email_verification", language),
        html: htmlContent,
        text: textContent,
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            response.msg = error;
            throw Error("email_not_sent");
        } else {
            response.msg = "Message sent successfully";
            response.status = true;
        }
    });
    return response;
};

/**
 * function to handle the errors in different languages using error codes
 * @param {string} err the error message code
 * @param {string} language the language to display the error
 * @returns the object of errors {email, password}
 */
const handleErrors = (err, language) => {
    let errors = { email: "", password: "" };
    // incorrect email
    if (err.message === "Incorrect email") {
        errors.email = getMessage("not_existing_email", language);
    }

    // incorrect email
    if (err.message === "Invalid email") {
        errors.email = getMessage("not_valid_email", language);
    }

    // empty email
    if (err.message === "Empty email") {
        errors.email = getMessage("empty_email", language);
    }

    // incorrect password
    if (err.message === "Incorrect password") {
        errors.email = getMessage("not_valid_password", language);
    }

    // duplicate error code
    if (err.code === 11000) {
        errors.email = getMessage("duplicated_email", language);
        return errors;
    }

    // validation errors
    if (err.message.includes("user validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = getMessage(properties.message, language);
        });
    }

    return errors;
};

// defining the expiration of the token
/**
 * function to generate the JWT that will authenticate the user to login
 * @param {string} id the id of the user to create the JWT token
 * @returns a JWT string to validate the user
 */
const createToken = (id) => {
    return jwt.sign({ id }, config.jwt_secret, {
        expiresIn: config.jwt_expires_in * 24 * 60 * 60,
    });
};

// Controller to create new users
exports.postSignup = async (req, res) => {
    const language = req.headers["accept-language"];
    const { email, password } = req.body;

    // we need to verify if the user was created in the catch
    // so we have to create the user variable out of the try catch scope
    let user = null;
    try {
        // create the new user
        user = await User.create({ email, password });

        // sent the email
        const email_status = await emailHandler(
            email,
            user.account_verification.verificationToken,
            language
        );

        // create the token ONLY if the user and the email were successfull
        const token = createToken(user._id);
        return res.status(201).json({ user: user._id, jwt_token: token });
    } catch (err) {
        if (user) {
            // if we have the user but we have an error then we need to remove the user from the DB
            const error_email = getMessage(err.message, language);
            await User.deleteOne(user._id);
            return res.status(400).json({ unexpected: error_email });
        }
        const errors = handleErrors(err, language);
        return res.status(400).json({ errors });
    }
};

// Controller to login the user
exports.postLogin = async (req, res) => {
    const language = req.headers["accept-language"];
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);
        if (user) {
            const token = createToken(user._id);
            return res.status(200).json({ user: user._id, jwt_token: token });
        }
    } catch (err) {
        const errors = handleErrors(err, language);
        return res.status(400).json({ errors: errors });
    }
    return res.status(201).json({});
};

// Controller to fetch all the users
exports.authorized = (req, res) => {
    let jwt_s = false;
    let verify_s = false;
    if (req.jwt_status) {
        jwt_s = req.jwt_status;
    }
    if (req.verify_status) {
        verify_s = req.jwt_status;
    }
    res.status(201).json({
        jwt_status: jwt_s,
        verify_status: verify_s,
    });
};

/**
 *
 * @param {object} req expecting the decoded token and language in the header
 * @param {object} res the isSent status, message and remaining
 * @returns
 */
exports.sendVerificationEmail = async (req, res) => {
    const language = req.headers["accept-language"];
    const email = req.body.email;
    if (!email && !isEmail(email)) {
        res.status(200).json({
            isSent: false,
            message: getMessage("not_valid_email", language),
            remaining: null,
        });
    }
    try {
        const user = await User.findOne({ email });
        // if we dont have the user with that ID then we shouldnt be here
        if (!user) {
            return res.status(401).json({
                isSent: false,
                message: "error finding the user",
                message: getMessage("user_not_found_try_again", language),
                remaining: null,
            });
        }
        let lastEmail;
        // set the value of the verify status only if exists
        if (user.account_verification) {
            lastEmail = user.account_verification.tokenGeneratedAt;
        }
        // Get the current time
        const currentTime = new Date();
        const timeDifference = currentTime - lastEmail;

        // Convert milliseconds to minutes
        const timeDifferenceMinutes = Math.floor(timeDifference / (1000 * 60));

        if (timeDifferenceMinutes < 5) {
            const time_remaining = 5 - timeDifferenceMinutes;
            // returning the remaining time in milliseconds
            return res.status(401).json({
                isSent: false,
                message: getMessage(
                    "remaining_time_to_resend",
                    language,
                    time_remaining
                ),
                remaining: timeDifference,
            });
        }

        // sent the email
        await emailHandler(
            user.email,
            user.account_verification.verificationToken,
            language
        );

        // now we need to update the new time in our user
        user.account_verification.tokenGeneratedAt = currentTime;
        await user.save();

        return res.status(200).json({
            isSent: true,
            message: getMessage("verification_email_sent", language),
            remaining: 0,
        });
    } catch (error) {
        return res.status(401).json({
            isSent: femail_not_sentalse,
            message: getMessage("email_not_sent", language),
            remaining: null,
        });
    }
};

/**
 * this function will try to find the user with the same code passed, if the user exists then we will
 * remove the code and set validated to true in the DB
 * @param {object} req we will get the request from the client with the information about the language, code
 * @param {object} res we will get an object {isVerified: boolean, msg: string}
 * @returns
 */
exports.verifyingEmailAccount = async (req, res) => {
    const language = req.headers["accept-language"];
    // verify that we get the code
    if (!req.body.code) {
        return res.status(401).json({
            isVerified: false,
            msg: getMessage("not_valid_code_passed", language),
        });
    }

    try {
        // try to find the user that is not verified and has the same code
        const user = await User.findOne({
            "account_verification.isVerified": false,
            "account_verification.verificationToken": req.body.code,
        });

        // Check if user is found
        if (!user) {
            return res.status(404).json({
                isVerified: false,
                msg: getMessage("user_not_found_try_again", language),
            });
        }

        // create a token so that we can login the user ONLY if there is a user
        const token = createToken(user._id);

        // Update the user document to mark as verified and remove verificationToken
        await User.findOneAndUpdate(
            { _id: user._id },
            {
                $set: {
                    "account_verification.isVerified": true,
                    "account_verification.verificationToken": null,
                },
            }
        );

        // return the success, no message required and a new token if any to login the user
        return res
            .status(200)
            .json({ isVerified: true, msg: "", jwt_token: token });
    } catch (error) {
        return res.status(500).json({
            isVerified: false,
            msg: getMessage("error_verifying_email_account", language),
        });
    }
};
