const Trainee = require("../../../models/Trainee"); // Path to the Trainee model

// Delete Trainee by ID
const deleteTrainee = async (req, res) => {
  try {
    const { traineeId } = req.params; // Get trainee ID from URL parameter

    // Find and delete the trainee
    const deletedTrainee = await Trainee.findByIdAndDelete(traineeId);

    // Check if trainee exists
    if (!deletedTrainee) {
      return res.status(404).json({
        success: false,
        error: "Trainee not found",
      });
    }

    // Return success response
    return res.status(200).json({
      success: true,
      message: "Trainee deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

module.exports = deleteTrainee;
