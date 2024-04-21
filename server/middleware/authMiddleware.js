const jwt = require("jsonwebtoken");
const config = require("../config/config");
const User = require("../models/User");

// this middleware will prevent the access to any route
// this middleware will prevent access to this API from other
// sources, not ONLy from the next.js client side
exports.jwtAuthentication = (req, res, next) => {
    const { name, value } = req.body;
    if (name === "token_auth" && value) {
        jwt.verify(value, config.jwt_secret, (err, decodedToken) => {
            if (err) {
                return res.status(401).json({ jwt_status: false });
            } else {
                req.jwt_status = true;
                req.decoded_token = decodedToken;
                return next();
            }
        });
    } else {
        return res.status(401).json({ jwt_status: false });
    }
};
exports.requireVerifyEmail = async (req, res, next) => {
    const decodedToken = req.decoded_token;
    const userId = decodedToken.id;
    // first we need to make sure we have the values required if not the app is going to crash
    if (!decodedToken || !userId) {
        return res
            .status(401)
            .json({ jwt_status: req.jwt_status, verify_status: false });
    }
    try {
        const user = await User.findById(userId);
        // if we dont have the user with that ID then we shouldnt be here
        if (!user) {
            return res.status(401).json({ jwt_status: false });
        }
        req.verify_status = true;
        // set the value of the verify status only if exists
        if (user.account_verification) {
            req.verify_status = user.account_verification.isVerified;
        }
        return next();
    } catch (error) {
        return res
            .status(401)
            .json({ jwt_status: req.jwt_status, verify_status: false });
    }
};
