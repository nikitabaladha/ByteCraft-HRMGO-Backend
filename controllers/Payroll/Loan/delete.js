const Loan = require('../../../models/Loan'); 

async function deleteCommission(req, res) {
  const { id } = req.params;

  try {
    const deletedLoan = await Loan.findByIdAndDelete(id);

    if (!deletedLoan) {
      return res.status(404).json({
        message: 'Loan not found',
      });
    }

    res.status(200).json({
      message: 'Loan deleted successfully',
      data: deletedLoan,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'An error occurred while deleting the Loan',
      error: error.message,
    });
  }
}

module.exports = deleteCommission;
