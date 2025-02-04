const Trainee = require("../../../models/Trainee"); // Path to the Trainee model

// Delete Trainee by ID
const deleteTrainee = async (req, res) => {
  try {
    const { id } = req.params; // Get trainee ID from URL parameter

    // Find and delete the trainee
    const deletedTrainee = await Trainee.findByIdAndDelete(id);

    // Check if trainee exists
    if (!deletedTrainee) {
      return res.status(404).json({
        hasError: true,
        error: "Trainee not found",
      });
    }

    // Return success response
    return res.status(200).json({
      hasError: false,
      message: "Trainee deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      hasError: true,
      error: err.message,
    });
  }
};

module.exports = deleteTrainee;
