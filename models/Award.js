const mongoose = require("mongoose");

const AwardSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    awardTypeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AwardType",
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
