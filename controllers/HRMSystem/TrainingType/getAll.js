const TrainingType = require("../../../models/TrainingType");

async function getAll(req, res) {
  try {
    const trainingTypes = await TrainingType.find();

    if (trainingTypes.length === 0) {
      return res.status(404).json({
        hasError: true,
        message: "No Training Types found",
      });
    }

    return res.status(200).json({
      hasError: false,
      message: "Training Types fetched successfully",
      data: trainingTypes,
    });
  } catch (error) {
    console.error("Error fetching training types:", error.message);
    return res.status(500).json({
      hasError: true,
      message: "Server error",
    });
  }
}

module.exports = getAll;
