const AwardType = require("../../../models/AwardType");

async function deleteAwardType(req, res) {
  const { id } = req.params;

  try {
    const deletedAwardType = await AwardType.findByIdAndDelete(id);

    if (!deletedAwardType) {
      return res.status(404).json({
        message: 'Award Type not found',
      });
    }

    res.status(200).json({
      message: 'Award Type deleted successfully',
      data: deletedAwardType,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'An error occurred while deleting the award type',
      error: error.message,
    });
  }
}

module.exports = deleteAwardType;
