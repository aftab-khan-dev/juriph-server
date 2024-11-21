// routes/conversationRoutes.js
const express = require("express");
const router = express.Router();
const conversationController = require("../Controller/conversation_controller");

// Route to send a message
router.post("/send-message", conversationController.sendMessage);

// Route to get messages between a client and a lawyer
router.get("/get-messages", conversationController.getMessages);

// Route to get conversations by user ID
router.get("/getUserMessage", conversationController.getConversationByUserId);

module.exports = router;
