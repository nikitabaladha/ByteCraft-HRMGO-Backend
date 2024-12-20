const Otherpayment = require('../../../models/Otherpayment'); 

async function deleteotherpayment(req, res) {
  const { id } = req.params;

  try {
    const deletedOtherpayment = await Otherpayment.findByIdAndDelete(id);

    if (!deletedOtherpayment) {
      return res.status(404).json({
        message: 'Other deduction not found',
      });
    }

    res.status(200).json({
      message: 'Other deduction deleted successfully',
      data: deletedOtherpayment,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'An error occurred while deleting the Other deduction',
      error: error.message,
    });
  }
}

module.exports = deleteotherpayment;
