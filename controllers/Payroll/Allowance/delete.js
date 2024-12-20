const Allowance = require('../../../models/Allowance'); 

async function deleteAllowance(req, res) {
  const { id } = req.params;

  try {
    const deletedAllowance = await Allowance.findByIdAndDelete(id);

    if (!deletedAllowance) {
      return res.status(404).json({
        message: 'Allowance not found',
      });
    }

    res.status(200).json({
      message: 'Allowance deleted successfully',
      data: deletedAllowance,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'An error occurred while deleting the allowance',
      error: error.message,
    });
  }
}

module.exports = deleteAllowance;
