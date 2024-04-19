const config = require("../config/config");

const User = require("../models/User");
const jwt = require("jsonwebtoken");

// handle errors
const handleErrors = (err) => {
    let errors = { email: "", password: "" };

    // incorrect email
    if (err.message === "Incorrect email") {
        errors.email = "authenticate:not_existing_email";
    }

    // incorrect email
    if (err.message === "Invalid email") {
        errors.email = "authenticate:not_valid_email";
    }

    // empty email
    if (err.message === "Empty email") {
        errors.email = "authenticate:empty_email";
    }

    // incorrect password
    if (err.message === "Incorrect password") {
        errors.password = "authenticate:not_valid_password";
    }

    // duplicate error code
    if (err.code === 11000) {
        errors.email = "authenticate:duplicated_email";
        return errors;
    }

    // validation errors
    if (err.message.includes("user validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;
};

// defining the expiration of the token
const createToken = (id) => {
    return jwt.sign({ id }, config.jwt_secret, {
        expiresIn: config.jwt_expires_in * 24 * 60 * 60,
    });
};

// Controller to create new users
exports.postSignup = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.create({ email, password });
        const token = createToken(user._id);
        return res.status(201).json({ user: user._id, jwt_token: token });
    } catch (err) {
        const errors = handleErrors(err);
        return res.status(400).json({ errors });
    }
};

// Controller to login the user
exports.postLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);
        if (user) {
            const token = createToken(user._id);
            return res.status(200).json({ user: user._id, jwt_token: token });
        }
    } catch (err) {
        const errors = handleErrors(err);
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
