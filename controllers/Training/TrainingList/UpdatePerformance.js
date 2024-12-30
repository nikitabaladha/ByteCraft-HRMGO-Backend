const Training = require('../../../models/TrainingList'); 

const updateTraining = async (req, res) => {
  try {
    const { id } = req.params; 
    const { status, Performance, Remark } = req.body;

    if (status && !['Pending', 'Started', 'Completed', 'Terminated'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }
    if (Performance && !['Not Concluded', 'Satisfactory', 'Average', 'Poor', 'Excellent'].includes(Performance)) {
      return res.status(400).json({ message: 'Invalid Performance value' });
    }
    if (Remark && Remark.length > 500) {
      return res.status(400).json({ message: 'Remark exceeds the maximum length of 500 characters' });
    }

    const updatedTraining = await Training.findByIdAndUpdate(
      id,
      {
        status,
        Performance,
        Remark,
      },
      { new: true, runValidators: true } 
    );

    if (!updatedTraining) {
      return res.status(404).json({
        message: 'Training not found',
      });
    }

    res.status(200).json({
      message: 'Training updated successfully',
      training: updatedTraining,
    });
  } catch (error) {
    res.status(400).json({
      message: 'Failed to update training',
      error: error.message,
    });
  }
};

module.exports = updateTraining;
