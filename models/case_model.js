const mongoose = require('mongoose');

const caseSchema = new mongoose.Schema({
  clientID: {
    type: String, 
    required: true
  },
  clientName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  caseType: {
    type: String,
    required: true
  },
  caseDescription: {
    type: String,
    required: true
  },
  dateOfIncident: {
    type: Date,
    required: true
  },
  witnesses: {
    type: String //[String] Array of witness names
  },
  evidence: {
    type: String //[String] Array of evidence (e.g., links)
  },
  expectedOutcome: {
    type: String
  },
  hasLawyer: {
    type: Boolean,
    default: false
  },
  lawyerName: {
    type: String
  },
  lawyerContact: {
    type: String
  },
  budget: {
    type: String,
    required: true
  },
  paymentMethod: {
    type: String,
    required: true
  }
});

const Case = mongoose.model('Case', caseSchema);

module.exports = Case;

