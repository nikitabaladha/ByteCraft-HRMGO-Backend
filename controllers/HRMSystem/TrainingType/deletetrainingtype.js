const TrainingType = require("../../../models/TrainingType");

async function deleteTrainingType(req, res) {
  const { id } = req.params;

  try {
    const deletedTrainingType = await TrainingType.findByIdAndDelete(id);

    if (!deletedTrainingType) {
      return res.status(404).json({
        message: 'Training Type not found',
      });
    }

    res.status(200).json({
      message: 'Training Type deleted successfully',
      data: deletedTrainingType,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'An error occurred while deleting the training type',
      error: error.message,
    });
  }
}

module.exports = deleteTrainingType;
