const Training = require('../../../models/TrainingList'); // Update the path as necessary

// Update an existing training record
const updateTraining = async (req, res) => {
  try {
    const { id } = req.params; // Extract the training ID from the request parameters
    const { status, Performance, Remark } = req.body;

    // Input validation (optional, ensure this aligns with the frontend validation logic)
    if (status && !['Pending', 'Started', 'Completed', 'Terminated'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }
    if (Performance && !['Not Concluded', 'Satisfactory', 'Average', 'Poor', 'Excellent'].includes(Performance)) {
      return res.status(400).json({ message: 'Invalid Performance value' });
    }
    if (Remark && Remark.length > 500) {
      return res.status(400).json({ message: 'Remark exceeds the maximum length of 500 characters' });
    }

    // Find the training record by ID and update it with new data
    const updatedTraining = await Training.findByIdAndUpdate(
      id,
      {
        status,
        Performance,
        Remark,
      },
      { new: true, runValidators: true } // Return the updated document and run validations
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
