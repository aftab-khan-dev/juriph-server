const mongoose = require("mongoose");

const LawyerSchema = new mongoose.Schema(
  {
    lawyerID: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    barNumber: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String, // URL or base64 string for image
    },
    practiceAreas: {
      type: [String], // e.g., ["Criminal Law", "Family Law"]
      required: true,
    },
    experienceYears: {
      type: Number,
      required: true,
    },
    languages: {
      type: [String], // e.g., ["English", "Spanish"]
      required: true,
    },
    education: {
      type: [String], // e.g., ["LLB - Harvard University, 2010"]
      required: true,
    },
    professionalExperience: {
      type: [String], // e.g., ["Partner at XYZ Law Firm - 5 years"]
      required: true,
    },
    certifications: {
      type: [String], // e.g., ["Bar Admission: NY, 2005"]
    },
    memberships: {
      type: [String], // e.g., ["American Bar Association"]
    },
    hourlyRate: {
      type: Number,
      required: true,
    },
    availability: {
      type: String, // e.g., "Full-time", "Part-time", "Weekends"
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
    achievements: {
      type: [String], // e.g., ["Won case XYZ", "Top lawyer 2022"]
    },
    website: {
      type: String, // Optional website link
    },
    isLawyer: {
      type: Boolean,
      default: 'true', 
    },
  },
);

module.exports = mongoose.model("Lawyer", LawyerSchema);
