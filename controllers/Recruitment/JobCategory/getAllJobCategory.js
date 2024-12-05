const JobCategory = require("../../../models/JobCategory"); // Adjust the path as needed

// Get All Job Categories
const getAllJobCategories = async (req, res) => {
  try {
    // Fetch all job categories
    const jobCategories = await JobCategory.find();

    if (!jobCategories || jobCategories.length === 0) {
      return res.status(404).json({ message: "No job categories found" });
    }

    res.status(200).json({
      message: "Job categories retrieved successfully",
      data: jobCategories,
    });
  } catch (error) {
    console.error("Error fetching job categories:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = getAllJobCategories;
