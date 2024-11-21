const express = require("express");
const { createCase, fetchCase, updateCase, deleteCase } = require("../Controller/case_controller");

const router = express.Router();

// Route to create a new case
router.post("/addcase", createCase);

// Route to fetch cases by clientID
router.get("/fetchcases", fetchCase);

// Route to update a case by ID
router.put("/updatecase", updateCase);

// Route to delete a case by ID
router.delete("/deletecase", deleteCase);

module.exports = router;
