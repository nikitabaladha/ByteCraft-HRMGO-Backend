// HRMGO-Backend\models\Designation.js
const mongoose = require("mongoose");

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
    branchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

DesignationSchema.index(
  { departmentId: 1, designationName: 1, branchId: 1 },
  { unique: true }
);

const Designation = mongoose.model("Designation", DesignationSchema);
module.exports = Designation;
