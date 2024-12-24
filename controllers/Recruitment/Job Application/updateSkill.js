const JobApplication = require('../../../models/JobApplication');

// Update a Job Application
const updateskill = async (req, res) => {
  try {
    const { id } = req.params; // Get the job application ID from URL params
    const updatedData = req.body; // Get the updated data from request body

    // Find and update the job application
    const updatedApplication = await JobApplication.findByIdAndUpdate(id, updatedData, {
      new: true, // Return the updated document
      runValidators: true, // Ensure the validation rules are applied
    });

    if (!updatedApplication) {
      return res.status(404).json({ message: "Job application not found" });
    }

    return res.status(200).json(updatedApplication);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports =  updateskill ;
