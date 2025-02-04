const ExpenseType = require("../../../models/ExpenseType");

async function deleteExpenseType(req, res) {
  const { id } = req.params;

  try {
    const deletedExpenseType = await ExpenseType.findByIdAndDelete(id);

    if (!deletedExpenseType) {
      return res.status(404).json({
        message: 'Expense Type not found',
      });
    }

    res.status(200).json({
      message: 'Expense Type deleted successfully',
      data: deletedExpenseType,
    });
  } catch (error) {
    console.error("Error deleting expense type:", error);

    res.status(500).json({
      message: 'An error occurred while deleting the expense type',
      error: error.message,
    });
  }
}

module.exports = deleteExpenseType;
