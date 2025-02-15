// HRMGO-Backend\models\IncomeExpenseChart.js
const mongoose = require("mongoose");

const IncomeExpenseChartSchema = new mongoose.Schema(
  {
    categories: {
      type: Date,
      required: true,
      unique: true,
    },
    incomeData: {
      type: Number,
      required: true,
    },
    expenseData: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

IncomeExpenseChartSchema.index({ categories: 1 }, { unique: true });

const IncomeExpenseChart = mongoose.model(
  "IncomeExpenseChart",
  IncomeExpenseChartSchema
);

module.exports = IncomeExpenseChart;
