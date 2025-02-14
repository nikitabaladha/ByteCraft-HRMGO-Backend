const mongoose = require("mongoose");

const JobApplicationSchema = new mongoose.Schema(
  {
    jobTitle: {
      type: String,
      required: [true, "Job title is required"],
    },
    branch: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: [
        /^\S+@\S+\.\S+$/,
        "Please provide a valid email address",
      ],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      match: [
        /^\+\d{1,3}\d{9,13}$/,
        "Phone number must include country code (e.g., +91)",
      ],
    },
    status: {
      type: String,
      enum: ["Applied", "Phone Screen", "Interview", "Hired", "Rejected"],
      default: "Applied",
    },
    isArchived: {
      type: Boolean,
      default: false, // Initially, item is not archived
    },
    skill: {
      type: [String],
      required: true,
    },
    Notes: {
      type: String,
      maxlength: 500, 
    },
    Remark: {
      type: String,
      maxlength: 500, 
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    dob: {
      type: Date,
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
    },
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    country: {
      type: String,
    },
    zipCode: {
      type: String,
    },
    profile: {
      type: String, 
    },
    resume: {
      type: String, 
    },
    coverLetter: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("JobApplication", JobApplicationSchema);
