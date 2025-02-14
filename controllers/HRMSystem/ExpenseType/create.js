const ExpenseType = require("../../../models/ExpenseType");

async function create(req, res) {
  try {
    const { expenseName } = req.body;

    if (!expenseName) {
      return res.status(400).json({ message: "Expense Type Name is required." });
    }

    const newExpenseType = new ExpenseType({
      expenseName,
    });

    await newExpenseType.save();

    return res.status(201).json({
      message: "Expense Type created successfully!",
      expenseType: newExpenseType,
    });
  } catch (error) {
    console.error("Error creating expense type:", error);
    return res.status(500).json({
      message: "Failed to create expense type.",
      error: error.message,
    });
  }
}

module.exports = create;
