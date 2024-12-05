const Job = require('../../../models/CreateJob'); // Replace with the correct path to your Job model

// Controller for fetching all jobs
const getAllJobs = async (req, res) => {
  try {
    // Fetch all jobs from the database
    const jobs = await Job.find();

    res.status(200).json({
      success: true,
      message: 'Jobs retrieved successfully',
      data: jobs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve jobs',
      error: error.message,
    });
  }
};

module.exports = getAllJobs;
