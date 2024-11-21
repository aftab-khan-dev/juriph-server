// models/conversation_model.js
const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
  sender_id: { type: String, required: true },
  client_id: { type: String, required: true },
  lawyer_id: { type: String, required: true },
  client_name: { type: String, required: true }, // Client name
  lawyer_name: { type: String, required: true }, // Lawyer name
  timestamp: { type: Date, default: Date.now },
  is_read: { type: Boolean, default: false }
});

module.exports = mongoose.model("Conversation", conversationSchema);
