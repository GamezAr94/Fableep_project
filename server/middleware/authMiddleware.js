const jwt = require("jsonwebtoken");
const config = require("../config/config");

// this middleware will prevent the access to any route
// this middleware will prevent access to this API from other
// sources, not ONLy from the next.js client side
const requireAuth = (req, res, next) => {
    const { name, value } = req.body;
    if (name === "token_auth" && value) {
        jwt.verify(value, config.jwt_secret, (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                return res.status(200).json({ status: false });
            } else {
                console.log("uesr authorized");
                res.status(201).json({ status: true });
                next();
            }
        });
    } else {
        // TODO test what will happen with the res as a middleware
        return res.status(201).json({ status: false });
    }
};
module.exports = { requireAuth };
