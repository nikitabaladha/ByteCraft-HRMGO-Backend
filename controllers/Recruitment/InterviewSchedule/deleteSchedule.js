const InterviewSchedule = require('../../../models/CreateNewInterviewSchedule');

const deleteInterviewSchedule = async (req, res) => {
  try {
    const { id } = req.params; 
    const deletedSchedule = await InterviewSchedule.findByIdAndDelete(id);

    if (!deletedSchedule) {
      return res.status(404).json({ message: 'Interview schedule not found' });
    }

    res.status(200).json({ message: 'Interview schedule deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = deleteInterviewSchedule;
