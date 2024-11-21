const Lawyer = require('../models/lawyer_model'); // Assuming the Lawyer model is in a models folder

// Create a new lawyer
exports.createLawyer = async (req, res) => {
  try {
    const lawyer = new Lawyer(req.body);
    const savedLawyer = await lawyer.save();
    res.status(201).json(savedLawyer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all lawyers
exports.getAllLawyers = async (req, res) => {
  try {
    const lawyers = await Lawyer.find();
    res.status(200).json(lawyers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get lawyer by ID from query (using req.query)
exports.getLawyerById = async (req, res) => {
  const { lawyerID } = req.query;  // Destructure custom `lawyerID` from query parameters

  if (!lawyerID) {
    return res.status(400).json({ error: 'Lawyer ID is required' });
  }

  try {
    const lawyer = await Lawyer.findOne({ lawyerID }); // Use `lawyerID` in the query

    if (!lawyer) {
      return res.status(404).json({ error: 'Lawyer not found' });
    }

    res.status(200).json(lawyer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Update lawyer by ID from query (using req.query)
exports.updateLawyer = async (req, res) => {
  try {
    const lawyerId = req.query.id;  // Get id from query
    const updatedLawyer = await Lawyer.findByIdAndUpdate(lawyerId, req.body, { new: true });
    if (!updatedLawyer) {
      return res.status(404).json({ error: 'Lawyer not found' });
    }
    res.status(200).json(updatedLawyer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete lawyer by ID from query (using req.query)
exports.deleteLawyer = async (req, res) => {
  try {
    const lawyerId = req.query.id;  // Get id from query
    const deletedLawyer = await Lawyer.findByIdAndDelete(lawyerId);
    if (!deletedLawyer) {
      return res.status(404).json({ error: 'Lawyer not found' });
    }
    res.status(200).json({ message: 'Lawyer deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
