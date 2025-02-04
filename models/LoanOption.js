const mongoose = require("mongoose");

const LoanOptionSchema = new mongoose.Schema({
  loanName: {
    type: String,
    required: true,
    unique: true,
  },
},
{ timestamps: true });

const LoanOption = mongoose.model("LoanOption", LoanOptionSchema);
module.exports = LoanOption;
