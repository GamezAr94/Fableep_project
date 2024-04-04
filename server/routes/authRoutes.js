const express = require("express");
const router = express.Router();

const usersController = require("../controllers/authControllers");

// Register a new user
router.post("/test", usersController.postSignup);

// Register a new user
router.get("/test", usersController.getUsers);

module.exports = router;
