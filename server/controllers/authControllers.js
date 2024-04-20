const config = require("../config/config");

const User = require("../models/User");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const getMessage = require("../lib/getLanguage");

/**
 * Function to create and send the email to verify the user's account
 * @param {string} to the email address to send the email
 * @param {string} subject the msg code to get the subject message
 * @param {string} content the msg code to get the content message
 * @returns
 */
const emailHandler = async (to, subject, content) => {
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

    var mailOptions = {
        from: config.email_user,
        to: to,
        subject: subject,
        html: `<div><h1>${content}</h1></div>`,
        text: content,
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
    console.log(err);
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
        // TODO we need to create a code that we need to send in the email to verify the user's account
        // sent the email
        const email_status = await emailHandler(
            email,
            getMessage("subject_email_verification", language),
            getMessage("body_email_verification", language)
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
exports.authToken = (req, res) => {
    const { name, value } = req.body;
    if (name === "token_auth" && value) {
        jwt.verify(value, config.jwt_secret, (err, decodedToken) => {
            if (err) {
                return res.status(200).json({ status: false });
            } else {
                return res.status(201).json({ status: true });
            }
        });
        return;
    }
    return res.status(201).json({ status: false });
};
