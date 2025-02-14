// HRMGO-Backend\models\Branch.js
const mongoose = require("mongoose");

// Branch Schema
const BranchSchema = new mongoose.Schema(
  {
    branchName: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

// Branch Model
const Branch = mongoose.model("Branch", BranchSchema);
module.exports = Branch;
