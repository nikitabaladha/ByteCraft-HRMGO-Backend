const Training = require('../../../models/TrainingList');

const deleteTrainingById = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTraining = await Training.findByIdAndDelete(id);

    if (!deletedTraining) {
      return res.status(404).json({
        message: `No training record found with ID: ${id}`,
      });
    }

    res.status(200).json({
      message: `Training record with ID ${id} deleted successfully`,
      deletedTraining,
    });
  } catch (error) {
    res.status(400).json({
      message: 'Failed to delete training record',
      error: error.message,
    });
  }
};

module.exports = deleteTrainingById;
