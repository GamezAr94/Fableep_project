const User = require("../models/User");

// handle errors
const handleErrors = (err) => {
    let errors = { email: "", password: "" };

    // duplicate error code
    if (err.code === 11000) {
        errors.email = "The email is already registered";
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

// Controller to create new users
exports.postSignup = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.create({ email, password });
        res.status(201).json(user);
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
};

// Controller to fetch all the users
exports.getUsers = (req, res) => {
    const users = User.fetchAll();
    console.log(users);
    return res.status(201).json(users);
};

// Controller to login the user
exports.postLogin = async (req, res) => {
    /*
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send("Username and password are required");
    }

    const user = new User(username, password);

    const result = user.login();

    if (!result.success) {
        return res.status(400).json(result);
    }

    return res.status(201).json(result);
    */
};
