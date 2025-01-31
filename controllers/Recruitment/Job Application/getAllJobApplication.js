const JobApplication = require("../../../models/JobApplication"); 

const getAllJobApplications = async (req, res) => {
  try {
    const applications = await JobApplication.find({ isArchived: false });

    if (!applications || applications.length === 0) {
      return res.status(404).json({
        message: "No job applications found",
      });
    }

    res.status(200).json({
      message: "Job applications fetched successfully",
      data: applications,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch job applications",
      error: error.message,
    });
  }
};

module.exports = getAllJobApplications;
