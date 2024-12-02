// Import the Training model
const Training = require('../../../models/TrainingList');

// Get training records by user ID
const getTrainingListById = async (req, res) => {
  try {
    const { id } = req.params; // Extract user ID from request parameters

    // Fetch training records for the specific user
    const userTrainings = await Training.find({ userId: id });

    // Check if there are any trainings found for the user
    if (userTrainings.length === 0) {
      return res.status(404).json({
        message: `No training records found for user with ID: ${id}`,
      });
    }

    res.status(200).json({
      message: `Trainings for user ID ${id} retrieved successfully`,
      trainings: userTrainings,
    });
  } catch (error) {
    res.status(400).json({
      message: 'Failed to retrieve training records',
      error: error.message,
    });
  }
};

module.exports = getTrainingListById;
