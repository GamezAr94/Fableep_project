const express = require("express");
const router = express.Router();
const middleware = require("../middleware/authMiddleware");

const usersController = require("../controllers/authControllers");

// Register a new user
router.post("/signup", usersController.postSignup);

// validate the authorization of a user,
// before validating it we need to make sure the email is verified
router.post(
    "/auth-token",
    middleware.jwtAuthentication,
    middleware.requireVerifyEmail,
    usersController.authorized
);

// Register a new user
router.post("/login", usersController.postLogin);

// Register a new user
router.post(
    "/send_verification_email",
    middleware.jwtAuthentication,
    usersController.sendVerificationEmail
);

module.exports = router;
