const Tax = require('../../../models/Tax');

async function deleteTax(req, res) {
  const { id } = req.params;

  try {
    const deletedTax = await Tax.findByIdAndDelete(id);

    if (!deletedTax) {
      return res.status(404).json({
        message: 'Tax record not found',
      });
    }

    res.status(200).json({
      message: 'Tax record deleted successfully',
      data: deletedTax,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'An error occurred while deleting the Tax record',
      error: error.message,
    });
  }
}

module.exports = deleteTax;
