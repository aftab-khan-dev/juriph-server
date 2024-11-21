const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  clerkId: { type: String, required: [true, "Clerk ID is required"], unique: true },
  role: { type: String, required: [true, "Role is required"] },
  name: { type: String },
  email: { type: String },
});

module.exports = mongoose.model("User", userSchema);
