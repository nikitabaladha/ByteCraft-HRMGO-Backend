const mongoose = require("mongoose");

// Define the schema for managing leaves with a reference to Employee
const ComplaintSchema = new mongoose.Schema(
  {
    complaintFromId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    complaintAgainstId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    complaintDate: { type: Date, required: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

ComplaintSchema.index(
  { complaintFromId: 1, complaintAgainstId: 1, complaintDate: 1 },
  { unique: true }
);

const Complaint = mongoose.model("Complaint", ComplaintSchema);

module.exports = Complaint;
