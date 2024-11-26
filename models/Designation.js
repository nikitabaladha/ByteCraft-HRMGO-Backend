// HRMGO-Backend\models\Designation.js
const mongoose = require("mongoose");

// Designation Schema
const DesignationSchema = new mongoose.Schema(
  {
    designationName: {
      type: String,
      required: true,
    },
    departmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

DesignationSchema.index(
  { departmentId: 1, designationName: 1 },
  { unique: true }
);

// Designation Model
const Designation = mongoose.model("Designation", DesignationSchema);
module.exports = Designation;
