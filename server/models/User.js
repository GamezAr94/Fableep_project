const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "empty_email"],
        unique: true,
        lowercase: true,
        validate: [isEmail, "not_valid_email"],
    },
    password: {
        type: String,
        required: [true, "empty_password"],
        minlength: [6, "min_password"],
    },
    account_verification: {
        isVerified: { type: Boolean, default: false },
        verificationToken: { type: String },
        tokenGeneratedAt: { type: Date, default: Date.now },
    },
});

// express hook: fire a function BEFORE dox saved to db
// hashing the password so we are not storing it in plain text
userSchema.pre("save", async function (next) {
    // encrypting the user's password
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);

    // we are going to generate a completely random code to send to the user
    const salt_token = await bcrypt.genSalt();
    this.account_verification.verificationToken = await bcrypt.hashSync(
        Date.now().toString(),
        salt_token
    );

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
