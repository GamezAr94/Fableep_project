const User = require("../models/User");

// Controller to create new users
exports.postSignup = (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send("Username and password are required");
    }

    const user = new User(req.body.username, req.body.password);

    const saveResult = user.save();

    if (!saveResult.success) {
        return res.status(400).json(saveResult);
    }

    return res.status(201).json(saveResult);
};

// Controller to fetch all the users
exports.getUsers = (req, res) => {
    const users = User.fetchAll();
    console.log(users);
    return res.status(201).json(users);
};
