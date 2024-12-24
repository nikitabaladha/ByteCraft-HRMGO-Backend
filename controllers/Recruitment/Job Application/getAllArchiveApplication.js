const JobApplication = require("../../../models/JobApplication"); 
const getAllArchiveJobApplications = async (req, res) => {
  try {
    const applications = await JobApplication.find({ isArchived: true });

    if (!applications || applications.length === 0) {
      return res.status(404).json({
        message: "No archived job applications found",
      });
    }

    res.status(200).json({
      message: "Archived job applications fetched successfully",
      applications,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch job applications",
      error: error.message,
    });
  }
};

module.exports = getAllArchiveJobApplications;
