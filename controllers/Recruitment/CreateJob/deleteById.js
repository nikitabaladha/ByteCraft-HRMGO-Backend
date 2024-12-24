const Job = require('../../../models/CreateJob'); // Replace with the correct path to your Job model

// Controller for deleting a job by ID
const deleteById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the job by ID and delete it
    const deletedJob = await Job.findByIdAndDelete(id);

    if (!deletedJob) {
      return res.status(404).json({
        success: false,
        message: 'Job not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Job deleted successfully',
      data: deletedJob, // Optionally return the deleted job details
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete job',
      error: error.message,
    });
  }
};

module.exports = deleteById;
