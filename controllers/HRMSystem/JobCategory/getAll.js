const JobCategory = require("../../../models/JobCategory");

async function getAll(req, res) {
  try {
    const jobCategories = await JobCategory.find();

    if (jobCategories.length === 0) {
      return res.status(404).json({
        hasError: true,
        message: "No Job Categories found",
      });
    }

    return res.status(200).json({
      hasError: false,
      message: "Job Categories fetched successfully",
      data: jobCategories,
    });
  } catch (error) {
    console.error("Error fetching job categories:", error.message);
    return res.status(500).json({
      hasError: true,
      message: "Server error",
    });
  }
}

module.exports = getAll;
