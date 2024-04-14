const config = require("../config/config");

const User = require("../models/User");
const jwt = require("jsonwebtoken");

// handle errors
const handleErrors = (err) => {
    let errors = { email: "", password: "" };

    // incorrect email
    if (err.message === "Incorrect email") {
        errors.email = "That email is not registered";
    }

    // incorrect password
    if (err.message === "Incorrect password") {
        errors.email = "That password is incorrect";
    }

    // duplicate error code
    if (err.code === 11000) {
        // TODO: set the i18n return an object maybe
        errors.email = "The email is already registered";
        return errors;
    }

    // validation errors
    if (err.message.includes("user validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            // TODO: set the i18n return an object maybe
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
    const { username, password } = req.body;

    try {
        const user = await User.login(username, password);
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
exports.getUsers = (req, res) => {
    const users = User.fetchAll();
    console.log(users);
    return res.status(201).json(users);
};
