const Training = require('../../../models/TrainingList'); // Update the path as necessary

// Update an existing training record
const updateTraining = async (req, res) => {
  try {
    const { id } = req.params; // Extract the training ID from the request parameters
    const {
      branch,
      trainerOption,
      trainingType,
      trainer,
      trainingCost,
      employee,
      startDate,
      endDate,
      description,
    } = req.body;

    // Find the training record by ID and update it with new data
    const updatedTraining = await Training.findByIdAndUpdate(
      id,
      {
        branch,
        trainerOption,
        trainingType,
        trainer,
        trainingCost,
        employee,
        startDate,
        endDate,
        description,
      },
      { new: true, runValidators: true } // Return the updated document and run validations
    );

    if (!updatedTraining) {
      return res.status(404).json({
        message: 'Training not found',
      });
    }

    res.status(200).json({
      message: 'Training updated successfully',
      training: updatedTraining,
    });
  } catch (error) {
    res.status(400).json({
      message: 'Failed to update training',
      error: error.message,
    });
  }
};

module.exports = updateTraining;
