const Job = require('../../../models/CreateJob'); 

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
      description,
      requirement,
      terms,
    } = req.body;

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
      description,
      requirement,
      terms,
    });

    // Save the job to the database
    await newJob.save();

    // Respond with the created job
    res.status(201).json({
      message: 'Job created successfully',
      job: newJob,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Failed to create job',
      error: error.message,
    });
  }
};

module.exports = createJob;
