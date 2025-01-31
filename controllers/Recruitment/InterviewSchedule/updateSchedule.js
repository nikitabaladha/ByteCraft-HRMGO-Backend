const InterviewSchedule = require('../../../models/CreateNewInterviewSchedule');

const updateInterviewSchedule = async (req, res) => {
  try {
    const { id } = req.params; 
    const { candidate, applicatAppliedFor, interviewer, date, time, comment, synchronizeType } = req.body;

    const updatedSchedule = await InterviewSchedule.findByIdAndUpdate(
      id,
      {
        candidate,
        applicatAppliedFor,
        interviewer,
        date,
        time,
        comment,
        synchronizeType,
      },
      { new: true } 
    );

    if (!updatedSchedule) {
      return res.status(404).json({ message: 'Interview schedule not found' });
    }

    res.status(200).json(updatedSchedule);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = updateInterviewSchedule;
