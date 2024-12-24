const IncomeType = require("../../../models/IncomeType");

async function getAll(req, res) {
  try {
    const incomeTypes = await IncomeType.find();

    if (incomeTypes.length === 0) {
      return res.status(404).json({
        hasError: true,
        message: "No Income Types found",
      });
    }

    return res.status(200).json({
      hasError: false,
      message: "Income Types fetched successfully",
      data: incomeTypes,
    });
  } catch (error) {
    console.error("Error fetching income types:", error.message);
    return res.status(500).json({
      hasError: true,
      message: "Server error",
    });
  }
}

module.exports = getAll;
