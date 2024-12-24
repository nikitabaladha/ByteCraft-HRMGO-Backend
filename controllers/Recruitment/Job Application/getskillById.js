const JobApplication = require('../../../models/JobApplication');

// Get Skill by ID
const getSkillById = async (req, res) => {
  try {
    const { id } = req.params; // Get the job application ID from URL params

    // Find the job application by ID
    const jobApplication = await JobApplication.findById(id);

    if (!jobApplication) {
      return res.status(404).json({ message: "Job application not found" });
    }

    // Assuming skills are stored in a field named 'skills'
    const { skill } = jobApplication;

    return res.status(200).json({ skill });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = getSkillById;
