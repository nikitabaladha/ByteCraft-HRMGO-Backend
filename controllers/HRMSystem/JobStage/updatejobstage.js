const JobStage = require("../../../models/JobStage");

async function update(req, res) {
  try {
    const { stageName } = req.body;
    const { id } = req.params;

    const jobStage = await JobStage.findById(id);

    if (!jobStage) {
      return res.status(404).json({ message: "Job Stage not found." });
    }

    jobStage.stageName = stageName || jobStage.stageName;

    await jobStage.save();

    return res.status(200).json({
      message: "Job Stage updated successfully!",
      jobStage,
    });
  } catch (error) {
    console.error("Error updating job stage:", error);
    return res.status(500).json({
      message: "Failed to update job stage.",
      error: error.message,
    });
  }
}

module.exports = update;
