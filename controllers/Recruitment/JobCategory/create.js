const JobCategory = require("../../../models/JobCategory"); // Adjust the path as needed

// Create Job Category
const createJobCategory = async (req, res) => {
  try {
    const { jobCategory } = req.body;

    // Check if the job category already exists
    const existingCategory = await JobCategory.findOne({ jobCategory });
    if (existingCategory) {
      return res.status(400).json({ message: "Job category already exists" });
    }

    // Create new job category
    const newCategory = new JobCategory({ jobCategory });
    await newCategory.save();

    res.status(201).json({
      message: "Job category created successfully",
      data: newCategory,
    });
  } catch (error) {
    console.error("Error creating job category:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports =  createJobCategory ;
