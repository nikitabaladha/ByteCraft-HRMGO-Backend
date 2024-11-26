// HRMGO-Backend\models\CompetencyList.js
const mongoose = require("mongoose");

// CompetencyList Schema
const CompetencyListSchema = new mongoose.Schema(
  {
    competencyListName: {
      type: String,
      required: true,
    },
    competencyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Competency",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

CompetencyListSchema.index(
  { competencyId: 1, competencyListName: 1 },
  { unique: true }
);

// CompetencyList Model
const CompetencyList = mongoose.model("CompetencyList", CompetencyListSchema);
module.exports = CompetencyList;
