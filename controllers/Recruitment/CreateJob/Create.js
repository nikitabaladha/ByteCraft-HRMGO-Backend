const Job = require('../../../models/CreateJob'); // Replace with the correct path to your Job model
const CreateJobValidator = require('../../../validators/Recruitment/CreateJobValidator')

// Controller for creating a job
const createJob = async (req, res) => {
  try {
    const {
      title,
      branch,
      category,
      position,
      status,
      startDate,
      endDate,
      skill,
      applicant,
      visibility,
      customQuestions,
      description,
      requirement,
      terms,
    } = req.body;

    // Create a new Job instance
    const newJob = new Job({
      title,
      branch,
      category,
      position,
      status,
      startDate,
      endDate,
      skill,
      applicant,
      visibility,
      customQuestions,
      description,
      requirement,
      terms,
    });

    // Save the job to the database
    const savedJob = await newJob.save();

    res.status(201).json({
      success: true,
      message: 'Job created successfully',
      data: savedJob,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create job',
      error: error.message,
    });
  }
};

module.exports = createJob ;


