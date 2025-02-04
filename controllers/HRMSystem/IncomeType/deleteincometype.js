const IncomeType = require("../../../models/IncomeType");

async function deleteIncomeType(req, res) {
  const { id } = req.params;

  try {
    const deletedIncomeType = await IncomeType.findByIdAndDelete(id);

    if (!deletedIncomeType) {
      return res.status(404).json({
        message: 'Income Type not found',
      });
    }

    res.status(200).json({
      message: 'Income Type deleted successfully',
      data: deletedIncomeType,
    });
  } catch (error) {
    console.error("Error deleting income type:", error);

    res.status(500).json({
      message: 'An error occurred while deleting the income type',
      error: error.message,
    });
  }
}

module.exports = deleteIncomeType;
