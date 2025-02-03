const ExpenseType = require("../../../models/ExpenseType");

async function getAll(req, res) {
  try {
    const expenseTypes = await ExpenseType.find();

    if (expenseTypes.length === 0) {
      return res.status(404).json({
        hasError: true,
        message: "No Expense Types found",
      });
    }

    return res.status(200).json({
      hasError: false,
      message: "Expense Types fetched successfully",
      data: expenseTypes,
    });
  } catch (error) {
    console.error("Error fetching expense types:", error.message);
    return res.status(500).json({
      hasError: true,
      message: "Server error",
    });
  }
}

module.exports = getAll;
