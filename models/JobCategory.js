const mongoose = require("mongoose");

const JobCategorySchema = new mongoose.Schema({
  jobCategory: {
    type: String,
    required: true,
    unique: true,
  },
}, { timestamps: true }); 

const JobCategory = mongoose.model("JobCategory", JobCategorySchema);
module.exports = JobCategory;
