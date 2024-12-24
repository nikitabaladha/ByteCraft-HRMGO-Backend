const JobCategory = require("../../../models/JobCategory");

async function create(req, res) {
  try {
    const { jobCategory } = req.body;

    if (!jobCategory) {
      return res.status(400).json({ message: "Job Category Name is required." });
    }

    const existingJobCategory = await JobCategory.findOne({ jobCategory });

    if (existingJobCategory) {
      return res.status(400).json({ message: "Job Category already exists." });
    }

    const newJobCategory = new JobCategory({
      jobCategory,
    });

    await newJobCategory.save();

    return res.status(201).json({
      message: "Job Category created successfully!",
      jobCategory: newJobCategory,
    });
  } catch (error) {
    console.error("Error creating job category:", error);

    return res.status(500).json({
      message: "Failed to create job category.",
      error: error.message,
    });
  }
}

module.exports = create;
