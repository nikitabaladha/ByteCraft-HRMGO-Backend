const mongoose = require("mongoose");

const ExpenseTypeSchema = new mongoose.Schema({
  expenseName: {
    type: String,
    required: true,
    unique: true,
  },
},
{ timestamps: true }
);

const ExpenseType = mongoose.model("ExpenseType", ExpenseTypeSchema);
module.exports = ExpenseType;
