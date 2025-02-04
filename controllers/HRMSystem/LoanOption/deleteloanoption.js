const LoanOption = require("../../../models/LoanOption");

async function deleteLoanOption(req, res) {
  const { id } = req.params;

  try {
    const deletedLoanOption = await LoanOption.findByIdAndDelete(id);

    if (!deletedLoanOption) {
      return res.status(404).json({
        message: 'Loan Option not found',
      });
    }

    res.status(200).json({
      message: 'Loan Option deleted successfully',
      data: deletedLoanOption,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'An error occurred while deleting the loan option',
      error: error.message,
    });
  }
}

module.exports = deleteLoanOption;
