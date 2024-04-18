const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "authenticate:empty_email"],
        unique: true,
        lowercase: true,
        validate: [isEmail, "authenticate:not_valid_email"],
    },
    password: {
        type: String,
        required: [true, "authenticate:empty_password"],
        minlength: [6, "authenticate:min_password"],
    },
});

// express hook: fire a function BEFORE dox saved to db
// hashing the password so we are not storing it in plain text
userSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    // calling next to exit this hook
    next();
});

// static method to login user
userSchema.statics.login = async function (email, password) {
    if (email.trim().length === 0) {
        throw Error("Empty email");
    }
    if (!isEmail(email)) {
        throw Error("Invalid email");
    }
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error("Incorrect password");
    }
    throw Error("Incorrect email");
};

const User = mongoose.model("user", userSchema);

module.exports = User;
