const PerformanceType = require("../../../models/PerformanceType");

async function deletePerformanceType(req, res) {
  const { id } = req.params;

  try {
    const deletedPerformanceType = await PerformanceType.findByIdAndDelete(id);

    if (!deletedPerformanceType) {
      return res.status(404).json({
        message: 'Performance Type not found',
      });
    }

    res.status(200).json({
      message: 'Performance Type deleted successfully',
      data: deletedPerformanceType,
    });
  } catch (error) {
    console.error("Error deleting performance type:", error);

    res.status(500).json({
      message: 'An error occurred while deleting the performance type',
      error: error.message,
    });
  }
}

module.exports = deletePerformanceType;
