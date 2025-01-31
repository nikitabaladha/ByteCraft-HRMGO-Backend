const { application } = require("express");
const mongoose = require("mongoose");

const jobOnboardSchema = new mongoose.Schema(
  {
    applicantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "application",
      required: true,
    },
    jobBranch: {
      type: String,
      required: true,
    },
    applicantName: {
      type: String,
      required: true,
    },
    applicatAppliedFor: {
      type: String,
      required: true,
    },
    applicationCreatedAt: {
      type: Date,
      required: true,
    },
    applicantPhone:{
      type: String,
      required: [true, "Phone number is required"],
      match: [
        /^\+\d{1,3}\d{9,13}$/,
        "Phone number must include country code (e.g., +91)",
      ],
    },
    applicantDOB: {
      type: Date,
    },
    applicantGender: {
      type: String,
      enum: ["Male", "Female"],
    },
    applicantEmail: {
      type: String,
      required: [true, "Email is required"],
      match: [
        /^\S+@\S+\.\S+$/,
        "Please provide a valid email address",
      ],
    },
    applicantAddress: {
      type: String,
    },
    joining_date: {
      type: Date,
      required: true,
    },
    days_of_week: {
      type: Number,
      required: true,
      min: 0,
    },
    salary: {
      type: Number,
      required: true,
      min: 0,
    },
    salary_type: {
      type: String,
      required: true,
      enum: ["Monthly Payslip", "Hourly Payslip"],
    },
    salary_duration: {
      type: String,
      required: true,
      enum: ["monthly", "weekly"],
    },
    job_type: {
      type: String,
      required: true,
      enum: ["full time", "part time"],
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "cancel", "confirm"],
    },
  },
  { timestamps: true }
);

const JobOnboard = mongoose.model("JobOnboard", jobOnboardSchema);

module.exports = JobOnboard;
