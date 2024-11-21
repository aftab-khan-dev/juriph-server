const Case = require("../models/case_model");

// Fetch cases by clientID (from query parameters)
exports.fetchCase = async (req, res) => {
  try {
    const { clientID } = req.query;

    if (!clientID) {
      return res.status(400).json({ message: "Client ID is required in query parameters." });
    }

    const cases = await Case.find({ clientID });

    if (cases.length === 0) {
      return res.status(404).json({ message: "No cases found for this client." });
    }

    res.status(200).json(cases);
  } catch (error) {
    console.error("Error fetching cases:", error);
    res.status(500).json({ message: "Error fetching cases", error });
  }
};

// Create a new case
exports.createCase = async (req, res) => {
  try {
    // Validate that clientID is provided in the query
    const { clientID } = req.query;

    if (!clientID) {
      return res.status(400).json({ message: "Client ID is required." });
    }

    // Add clientID to the request body
    req.body.clientID = clientID;

    // Validate other required fields
    if (!req.body.clientName || !req.body.email || !req.body.phone || !req.body.caseType || !req.body.caseDescription || !req.body.dateOfIncident || !req.body.budget || !req.body.paymentMethod) {
      return res.status(400).json({ message: "All required fields must be provided." });
    }

    const newCase = new Case(req.body);
    const savedCase = await newCase.save();
    res.status(201).json(savedCase);
  } catch (error) {
    console.error("Error creating case:", error); // Log the entire error object
    res.status(400).json({ message: "Error creating case", error: error });
  }
};

// Update a case by ID
exports.updateCase = async (req, res) => {
  try {
    const { caseID } = req.query;

    if (!caseID) {
      return res.status(400).json({ message: "Case ID is required." });
    }

    const updatedCase = await Case.findByIdAndUpdate(caseID, req.body, { new: true });

    if (!updatedCase) {
      return res.status(404).json({ message: "Case not found." });
    }

    res.status(200).json(updatedCase);
  } catch (error) {
    console.error("Error updating case:", error);
    res.status(500).json({ message: "Error updating case", error });
  }
};

// Delete a case by ID
exports.deleteCase = async (req, res) => {
  try {
    const { caseID } = req.query;

    if (!caseID) {
      return res.status(400).json({ message: "Case ID is required." });
    }

    const deletedCase = await Case.findByIdAndDelete(caseID);

    if (!deletedCase) {
      return res.status(404).json({ message: "Case not found." });
    }

    res.status(200).json({ message: "Case deleted successfully." });
  } catch (error) {
    console.error("Error deleting case:", error);
    res.status(500).json({ message: "Error deleting case", error });
  }
};
