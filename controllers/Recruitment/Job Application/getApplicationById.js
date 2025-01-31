const JobApplication = require("../../../models/JobApplication");

const getJobApplicationById = async (req, res) => {
  try {
    const { id } = req.params; 
    const application = await JobApplication.findById(id);
    if (!application) {
      return res.status(404).json({
        message: "Job application not found",
      });
    }

    res.status(200).json({
      message: "Job application fetched successfully",
      application,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch job application",
      error: error.message,
    });
  }
};

module.exports = getJobApplicationById;
