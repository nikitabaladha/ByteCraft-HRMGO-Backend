const mongoose = require("mongoose");

const CompetencySchema = new mongoose.Schema(
  {
    competencyType: {
      type: String,
      enum: ["Organizational", "Technical", "Behavioral"],
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Competency = mongoose.model("Competency", CompetencySchema);
module.exports = Competency;
