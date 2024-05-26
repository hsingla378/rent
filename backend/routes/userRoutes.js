const express = require("express");
const router = express.Router();
const { userController } = require("../controllers");
const auth = require("../middleware/auth");

// Register Route
router.post("/register", userController.registerUser);

// Login Route
router.post("/login", userController.loginUser);

// Get User by ID Route
router.get("/", auth, userController.getUserById);

module.exports = router;
