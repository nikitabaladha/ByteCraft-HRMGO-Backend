const InterviewSchedule = require('../../../models/CreateNewInterviewSchedule');

const getAllInterviewSchedules = async (req, res) => {
  try {
    const interviewSchedules = await InterviewSchedule.find();
    res.status(200).json(interviewSchedules);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getAllInterviewSchedules;
