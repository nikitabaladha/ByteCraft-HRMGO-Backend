// HRMGO-Backend\models\Branch.js
const mongoose = require("mongoose");

// Branch Schema
const JobCategorySchema = new mongoose.Schema(
  {
    jobCategory: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

// Branch Model
const JobCategory = mongoose.model("JobCategory", JobCategorySchema);
module.exports = JobCategory;
