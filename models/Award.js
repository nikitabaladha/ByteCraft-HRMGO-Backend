const mongoose = require("mongoose");

// Define the schema for managing leaves with a reference to Employee
const AwardSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    awardType: {
      type: String,
      enum: ["Trophy", "Certificate"],
      required: true,
    },
    date: { type: Date, required: true },
    gift: { type: String, required: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Award = mongoose.model("Award", AwardSchema);
module.exports = Award;
