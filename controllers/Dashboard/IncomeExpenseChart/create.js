// HRMGO-Backend\controllers\Dashboard\IncomeExpenseChart\create.js

const IncomeExpenseChart = require("../../../models/IncomeExpenseChart");
const IncomeExpenseChartValidator = require("../../../validators/DashboardValidators/IncomeExpenseChartValidator");

async function create(req, res) {
  try {
    // const userId = req.user.id;

    const { error } = IncomeExpenseChartValidator.validate(req.body);

    if (error?.details?.length) {
      const errorMessages = error.details.map((err) => err.message).join(", ");
      return res.status(400).json({ hasError: true, message: errorMessages });
    }

    const { incomeData, expenseData, categories } = req.body;

    const newIncomeExpenseChart = new IncomeExpenseChart({
      incomeData,
      expenseData,
      categories,
      // userId,
    });

    await newIncomeExpenseChart.save();

    return res.status(201).json({
      hasError: false,
      message: "Income Expense Chart created successfully",
      data: newIncomeExpenseChart,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        hasError: true,
        message: "Duplicate entry: Data for this date already exists.",
      });
    }

    console.error("Error creating IncomeExpenseChart:", error.message);
    return res.status(500).json({ hasError: true, message: "Server error" });
  }
}

module.exports = create;
