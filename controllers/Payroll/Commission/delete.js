const Commission = require('../../../models/Commission'); 

async function deleteCommission(req, res) {
  const { id } = req.params;

  try {
    const deletedCommission = await Commission.findByIdAndDelete(id);

    if (!deletedCommission) {
      return res.status(404).json({
        message: 'Commission not found',
      });
    }

    res.status(200).json({
      message: 'Commission deleted successfully',
      data: deletedCommission,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'An error occurred while deleting the commission',
      error: error.message,
    });
  }
}

module.exports = deleteCommission;
