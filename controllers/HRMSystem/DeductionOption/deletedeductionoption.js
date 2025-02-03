
const DeductionOption = require("../../../models/DeductionOption");

async function deleteDeductionOption(req, res) {
  const { id } = req.params;

  try {
    const deletedDeductionOption = await DeductionOption.findByIdAndDelete(id);

    if (!deletedDeductionOption) {
      return res.status(404).json({
        message: 'Deduction Option not found',
      });
    }

    res.status(200).json({
      message: 'Deduction Option deleted successfully',
      data: deletedDeductionOption,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'An error occurred while deleting the deduction option',
      error: error.message,
    });
  }
}

module.exports = deleteDeductionOption;
