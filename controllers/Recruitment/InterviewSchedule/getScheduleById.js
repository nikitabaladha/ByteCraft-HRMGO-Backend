const InterviewSchedule = require('../../../models/CreateNewInterviewSchedule');

const getInterviewScheduleById = async (req, res) => {
  try {
    const { id } = req.params; 
    const interviewSchedule = await InterviewSchedule.findById(id); 
    if (!interviewSchedule) {
      return res.status(404).json({ message: 'Interview schedule not found' }); 
    }
    res.status(200).json(interviewSchedule); 
  } catch (error) {
    res.status(500).json({ error: error.message }); 
  }
};

module.exports = getInterviewScheduleById;