const Overtime = require('../../../models/Overtime');

async function deleteOvertime(req, res) {
  const { id } = req.params;

  try {
    const deletedOvertime = await Overtime.findByIdAndDelete(id);

    if (!deletedOvertime) {
      return res.status(404).json({
        message: 'Overtime record not found',
      });
    }

    res.status(200).json({
      message: 'Overtime record deleted successfully',
      data: deletedOvertime,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'An error occurred while deleting the Overtime record',
      error: error.message,
    });
  }
}

module.exports = deleteOvertime;
