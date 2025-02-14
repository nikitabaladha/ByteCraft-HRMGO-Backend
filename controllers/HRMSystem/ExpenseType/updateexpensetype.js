const ExpenseType = require("../../../models/ExpenseType");

async function update(req, res) {
  try {
    const { expenseName } = req.body; 
    const { id } = req.params;

    const expenseType = await ExpenseType.findById(id);

    if (!expenseType) {
      return res.status(404).json({ message: "Expense Type not found." });
    }

    expenseType.expenseName = expenseName || expenseType.expenseName; 

    await expenseType.save();

    return res.status(200).json({
      message: "Expense Type updated successfully!",
      expenseType, 
    });
  } catch (error) {
    console.error("Error updating expense type:", error);
    return res.status(500).json({
      message: "Failed to update expense type.",
      error: error.message,
    });
  }
}

module.exports = update;
