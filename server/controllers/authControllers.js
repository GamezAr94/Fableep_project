const User = require("../models/User");

// Controller to create new users
exports.postSignup = async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;

    try {
        const user = await User.create({ email, password });
        res.status(201).json(user);
    } catch (err) {
        console.log(err);
        res.status(400).send("error, user not created");
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
