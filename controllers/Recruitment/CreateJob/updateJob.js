const Job = require('../../../models/CreateJob'); 
const CreateJobValidator = require('../../../validators/Recruitment/CreateJobValidator'); 
const updateJob = async (req, res) => {
  try {
    const { id } = req.params; 
    const updatedData = req.body;
    const updatedJob = await Job.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true, 
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
