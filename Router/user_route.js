const express = require("express");
const router = express.Router();
const {
  registerUser,
  getUserByClerkId,
} = require("../Controller/user_controller");

// Register user route
router.post("/register", registerUser);

// Get user data by Clerk ID
router.get("/login", getUserByClerkId);

module.exports = router;
