const mongoose = require("mongoose");

const IncomeTypeSchema = new mongoose.Schema({
  incomeName: {
    type: String,
    required: true,
    unique: true,
  },
},
{ timestamps: true });

const IncomeType = mongoose.model("IncomeType", IncomeTypeSchema);
module.exports = IncomeType;
