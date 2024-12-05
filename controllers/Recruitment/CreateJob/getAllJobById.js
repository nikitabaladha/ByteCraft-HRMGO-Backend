const Job = require('../../../models/CreateJob'); // Replace with the correct path to your Job model

// Controller for fetching a job by ID
const getJobById = async (req, res) => {
  try {
    const { id } = req.params; // Extract job ID from request parameters

    // Fetch job details by ID from the database
    const job = await Job.findById(id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Job retrieved successfully',
      data: job,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve job details',
      error: error.message,
    });
  }
};

module.exports = getJobById;

