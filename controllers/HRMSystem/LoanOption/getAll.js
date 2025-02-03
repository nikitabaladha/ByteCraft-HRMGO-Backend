const LoanOption = require("../../../models/LoanOption");

async function getAll(req, res) {
  try {
    const loanOptions = await LoanOption.find();

    if (loanOptions.length === 0) {
      return res.status(404).json({
        hasError: true,
        message: "No Loan Options found",
      });
    }

    return res.status(200).json({
      hasError: false,
      message: "Loan Options fetched successfully",
      data: loanOptions,
    });
  } catch (error) {
    console.error("Error fetching loan options:", error.message);
    return res.status(500).json({
      hasError: true,
      message: "Server error",
    });
  }
}

module.exports = getAll;
