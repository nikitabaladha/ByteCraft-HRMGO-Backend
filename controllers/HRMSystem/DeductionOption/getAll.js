
const DeductionOption = require("../../../models/DeductionOption");

async function getAll(req, res) {
  try {
    const deductionOptions = await DeductionOption.find();

    if (deductionOptions.length === 0) {
      return res.status(404).json({
        hasError: true,
        message: "No Deduction Options found",
      });
    }

    return res.status(200).json({
      hasError: false,
      message: "Deduction Options fetched successfully",
      data: deductionOptions,
    });
  } catch (error) {
    console.error("Error fetching deduction options:", error.message);
    return res.status(500).json({
      hasError: true,
      message: "Server error",
    });
  }
}

module.exports = getAll;
