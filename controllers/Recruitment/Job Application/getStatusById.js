const JobApplication = require("../../../models/JobApplication");

// Get Job Application by ID
const getStatusById = async (req, res) => {
  const { id } = req.params; 

  try {
    const application = await JobApplication.findById(id);

    if (!application) {
      return res.status(404).json({ message: "Job Application not found" });
    }

    res.status(200).json({ message: "Job Application retrieved successfully", application });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving job application", error: error.message });
  }
};

module.exports = getStatusById;
