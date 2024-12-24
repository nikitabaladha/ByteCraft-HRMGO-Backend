const JobStage = require("../../../models/JobStage");

async function getAll(req, res) {
  try {
    const jobStages = await JobStage.find();

    if (jobStages.length === 0) {
      return res.status(404).json({
        hasError: true,
        message: "No Job Stages found",
      });
    }

    return res.status(200).json({
      hasError: false,
      message: "Job Stages fetched successfully",
      data: jobStages,
    });
  } catch (error) {
    console.error("Error fetching job stages:", error.message);
    return res.status(500).json({
      hasError: true,
      message: "Server error",
    });
  }
}

module.exports = getAll;
