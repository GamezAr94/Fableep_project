const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
});

const User = mongoose.model("user", userSchema);

module.exports = User;

/*
const users = [];

class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }

    // save user to the array
    save() {
        // Check if user already exists
        if (users.some((user) => user.username === this.username)) {
            return { success: false, message: "User already exists" };
        }

        // Store user credentials
        users.push(this);
        return { success: true, message: "User created successfully" };
    }

    static fetchAll() {
        return users;
    }

    login() {
        if (
            users.some((user) => user.username === this.username) &&
            users.some((user) => user.password === this.password)
        ) {
            return { success: true, message: "User loged in successfully" };
        }
        return {
            success: false,
            message: "username or password doesn't match",
        };
    }
}

module.exports = User;
*/