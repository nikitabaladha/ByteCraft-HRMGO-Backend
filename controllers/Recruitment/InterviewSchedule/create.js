const InterviewSchedule = require('../../../models/CreateNewInterviewSchedule');

// Create Interview Schedule API
const createInterviewSchedule = async (req, res) => {
  try {
    const {
      applicantId,
      candidate,
      applicatAppliedFor,
      applicantEmail,
      applicantPhone,
      applicantStatus,
      applicantDOB,
      applicantGender,
      applicationCreatedAt,
      applicantAddress,
      interviewer,
      date,
      time,
      comment,
      synchronizeType
    } = req.body;

    // Create a new interview schedule
    const newInterviewSchedule = new InterviewSchedule({
      applicantId,
      candidate,
      applicatAppliedFor,
      applicantEmail,
      applicantPhone,
      applicantStatus,
      applicantDOB,
      applicantGender,
      applicationCreatedAt,
      applicantAddress,
      interviewer,
      date,
      time,
      comment,
      synchronizeType
    });

    // Save the interview schedule to the database
    const savedSchedule = await newInterviewSchedule.save();

    return res.status(201).json({
      success: true,
      message: 'Interview schedule created successfully',
      data: savedSchedule
    });
  } catch (error) {
    console.error('Error creating interview schedule:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while creating the interview schedule',
      error: error.message
    });
  }
};

module.exports =  createInterviewSchedule;

