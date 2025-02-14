const JobCategory = require("../../../models/JobCategory");

async function update(req, res) {
  try {
    const { jobCategory } = req.body;
    const { id } = req.params;

    const existingJobCategory = await JobCategory.findById(id);

    if (!existingJobCategory) {
      return res.status(404).json({ message: "Job Category not found." });
    }

    existingJobCategory.jobCategory = jobCategory || existingJobCategory.jobCategory;

    await existingJobCategory.save();

    return res.status(200).json({
      message: "Job Category updated successfully!",
      jobCategory: existingJobCategory,
    });
  } catch (error) {
    console.error("Error updating job category:", error);
    return res.status(500).json({
      message: "Failed to update job category.",
      error: error.message,
    });
  }
}

module.exports = update;
