const Performance = require("../../models/Performance");

// Function to delete a performance record
async function deletePerformance(req, res) {
  try {
    const { id } = req.params; // Get the ID from the request parameters

    // Find and delete the performance record by its ID
    const performance = await Performance.findByIdAndDelete(id);

    // If the performance record doesn't exist
    if (!performance) {
      return res.status(404).json({
        message: "Performance record not found.",
      });
    }

    // Successfully deleted
    return res.status(200).json({
      message: "Performance record deleted successfully.",
      data: performance,
    });
  } catch (error) {
    console.error("Error deleting performance record:", error);
    return res.status(500).json({
      message: "Failed to delete performance record.",
      error: error.message,
    });
  }
}

module.exports = deletePerformance;
