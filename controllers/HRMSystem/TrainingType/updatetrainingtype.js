const TrainingType = require("../../../models/TrainingType");

async function update(req, res) {
  try {
    const { trainingName } = req.body;
    const { id } = req.params;

    const trainingType = await TrainingType.findById(id);

    if (!trainingType) {
      return res.status(404).json({ message: "Training Type not found." });
    }

    trainingType.trainingName = trainingName || trainingType.trainingName;

    await trainingType.save();

    return res.status(200).json({
      message: "Training Type updated successfully!",
      trainingType,
    });
  } catch (error) {
    console.error("Error updating training type:", error);
    return res.status(500).json({
      message: "Failed to update training type.",
      error: error.message,
    });
  }
}

module.exports = update;
