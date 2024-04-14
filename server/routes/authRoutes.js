const express = require("express");
const router = express.Router();

const usersController = require("../controllers/authControllers");

// Register a new user
router.post("/signup", usersController.postSignup);

// validate the authorization of a user
router.post("/auth-token", usersController.authToken);

// Register a new user
router.post("/login", usersController.postLogin);

module.exports = router;
