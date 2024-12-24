const TrainingType = require("../../../models/TrainingType");

async function create(req, res) {
  try {
    const { trainingName } = req.body;

    if (!trainingName) {
      return res.status(400).json({ message: "Training Type Name is required." });
    }

    const newTrainingType = new TrainingType({
      trainingName,
    });

    await newTrainingType.save();

    return res.status(201).json({
      message: "Training Type created successfully!",
      trainingType: newTrainingType,
    });
  } catch (error) {
    console.error("Error creating training type:", error);
    return res.status(500).json({
      message: "Failed to create training type.",
      error: error.message,
    });
  }
}

module.exports = create;
