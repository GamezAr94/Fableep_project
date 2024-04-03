const express = require("express");

const router = express.Router();

const usersController = require("../controllers/users");

// Register a new user
router.post("/test", usersController.postAddNewUser);

// Register a new user
router.get("/test", usersController.getUsers);

module.exports = router;
