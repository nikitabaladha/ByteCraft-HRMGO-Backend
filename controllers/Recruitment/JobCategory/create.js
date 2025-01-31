const JobCategory = require("../../../models/JobCategory"); 

const createJobCategory = async (req, res) => {
  try {
    const { jobCategory } = req.body;

    const existingCategory = await JobCategory.findOne({ jobCategory });
    if (existingCategory) {
      return res.status(400).json({ message: "Job category already exists" });
    }

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
