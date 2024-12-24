const JobApplication = require("../../../models/JobApplication");

const deleteJobApplicationById = async (req, res) => {
  const { id } = req.params;

  try {
    // Check if the application exists
    const application = await JobApplication.findById(id);

    if (!application) {
      return res.status(404).json({
        message: "Job application not found",
      });
    }

    // Delete the application
    await JobApplication.findByIdAndDelete(id);

    res.status(200).json({
      message: "Job application deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete job application",
      error: error.message,
    });
  }
};

module.exports = deleteJobApplicationById;
