const Job = require('../../../models/CreateJob'); // Replace with the correct path to your Job model
const CreateJobValidator = require('../../../validators/Recruitment/CreateJobValidator'); // Replace with the correct validator if needed

// Controller for updating a job
const updateJob = async (req, res) => {
  try {
    const { id } = req.params; // Assuming job ID is passed as a URL parameter
    const updatedData = req.body;
    const updatedJob = await Job.findByIdAndUpdate(id, updatedData, {
      new: true, // Return the updated document
      runValidators: true, // Ensure validation rules are applied
    });

    if (!updatedJob) {
      return res.status(404).json({
        success: false,
        message: 'Job not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Job updated successfully',
      data: updatedJob,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update job',
      error: error.message,
    });
  }
};

module.exports = updateJob;
