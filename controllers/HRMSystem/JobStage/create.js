const JobStage = require("../../../models/JobStage");

async function create(req, res) {
  try {
    const { stageName } = req.body;

    if (!stageName) {
      return res.status(400).json({ message: "Job Stage Name is required." });
    }

    const newJobStage = new JobStage({
      stageName,
    });

    await newJobStage.save();

    return res.status(201).json({
      message: "Job Stage created successfully!",
      jobStage: newJobStage,
    });
  } catch (error) {
    console.error("Error creating job stage:", error);
    return res.status(500).json({
      message: "Failed to create job stage.",
      error: error.message,
    });
  }
}

module.exports = create;
