require("dotenv").config();
const express = require("express");
const cors = require("cors");
const user_router = require("./Router/user_route.js");
const case_router = require("./Router/case_router.js");
const lawyer_router = require("./Router/lawyer_router.js");
const conversation_router = require("./Router/conversation_router.js");
const stripe_router = require("./Router/stripe_router.js");
// Create an instance of an Express application
const app = express();

// CORS options: Specify allowed methods and headers
const corsOptions = {
  origin: (origin, callback) => {
    callback(null, true); 
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Use CORS middleware with the defined options
app.use(cors(corsOptions));

// Handle preflight requests (OPTIONS)
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    return res.status(200).json({ message: "Preflight handled" });
  }
  next();
});

// Use middleware to parse JSON requests
app.use(express.json());
app.use("/user", user_router);
app.use("/case", case_router);
app.use("/lawyer", lawyer_router);
app.use("/conversation", conversation_router);
app.use("/payment", stripe_router); // Add the Stripe router here

// Simple API endpoint for testing server
app.get("/", (req, res) => {
  res
    .status(200)
    .send("Welcome to the Server! Everything is up and running.🌎");
});

// Define the port

const PORT = process.env.PORT || 3000;
// Require Database Connection from Utils
require("./Utils/db.js");

// Start the server and listen on the defined port
app.listen(PORT, (error) => {
  if (error) { 
    console.error("================= ❌ Error starting the server:", error);
  } else {
    console.log(
      `💻 ================= Welcome Wizard Server Listening ON PORT# ${PORT} =============== 💻`
    );
  }
});


