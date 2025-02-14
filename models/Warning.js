const mongoose = require("mongoose");

// Define the schema for managing leaves with a reference to Employee
const WarningSchema = new mongoose.Schema(
  {
    warningById: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    warningToId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    warningDate: { type: Date, required: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

WarningSchema.index(
  { warningById: 1, warningToId: 1, warningDate: 1 },
  { unique: true }
);

const Warning = mongoose.model("Warning", WarningSchema);

module.exports = Warning;
