console.log("Loading User model...");
const mongoose = require("mongoose")

const User = require("../models/User.model.js");
console.log("User model loaded successfully.");

// Register user with Clerk data
exports.registerUser = async (req, res) => {
  const { clerkId, role, name, email } = req.body;

  if (!clerkId) {
    return res.status(400).json({ message: "clerkId is required" });
  }

  try {
    // Check if the user already exists
    let user = await User.findOne({ clerkId });

    if (user) {
      return res.status(409).json({ message: "User already exists", user });
    }

    // Create a new user if not found
    user = new User({ clerkId, role, name, email });
    await user.save();

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
};

// Fetch user by Clerk ID
exports.getUserByClerkId = async (req, res) => {
  const { clerkId } = req.query;

  try {
    const user = await User.findOne({ clerkId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user data", error });
  }
};
