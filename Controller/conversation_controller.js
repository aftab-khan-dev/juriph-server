// controllers/conversationController.js
const Conversation = require("../models/conversation_model");

// Send a message
exports.sendMessage = async (req, res) => {
  try {
    const { client_name, lawyer_name, client_id, lawyer_id, sender_id } =
      req.body;

    // Validate required data
    if (
      !client_name ||
      !lawyer_name ||
      !client_id ||
      !lawyer_id ||
      !sender_id
    ) {
      return res.status(400).json({ error: "Invalid data to send" });
    }

    // Create a new message document
    const newMessage = {
      sender_id,
      client_id,
      lawyer_id,
      client_name,
      lawyer_name,
      timestamp: new Date(), // Adding timestamp
      is_read: false,
    };

    // Save the message as a new document in the Conversation collection
    const conversation = new Conversation(newMessage);
    await conversation.save();

    // Return the saved message as response
    res.status(201).json({ message: "Message sent", conversation });
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get messages between client and lawyer
exports.getMessages = async (req, res) => {
  try {
    const { client_id, lawyer_id } = req.query; // Use query parameters

    // Validate required data
    if (!client_id || !lawyer_id) {
      return res.status(400).json({ error: "Invalid data to fetch messages" });
    }

    // Find all messages related to the client and lawyer
    const messages = await Conversation.find({
      client_id,
      lawyer_id,
    });

    if (!messages.length) {
      return res.status(404).json({ message: "No messages found" });
    }

    // Return the messages
    res.status(200).json(messages);
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get conversation by user ID
exports.getConversationByUserId = async (req, res) => {
  try {
    const { userId } = req.query; // Get the userId from query parameters

    // Validate userId
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    // Find conversations where the user is either the client or the lawyer
    const conversations = await Conversation.find({
      $or: [{ client_id: userId }, { lawyer_id: userId }],
    });

    if (!conversations.length) {
      return res.status(404).json({ message: "No conversations found" });
    }

    // Return the conversations
    res.status(200).json(conversations);
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
