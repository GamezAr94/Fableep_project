const express = require("express");
const router = express.Router();

const usersController = require("../controllers/authControllers");

// Register a new user
router.post("/signup", usersController.postSignup);

// Get all users
router.get("/getusers", usersController.getUsers);

// Register a new user
router.post("/login", usersController.postLogin);

module.exports = router;
