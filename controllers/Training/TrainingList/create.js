const Training = require('../../../models/TrainingList'); // Update the path as necessary

// Create a new training record
const createTraining = async (req, res) => {
  try {
    const {
      branch,
      trainerOption,
      trainingType,
      trainer,
      trainingCost,
      employee,
      startDate,
      endDate,
      description,
    } = req.body;

    // Create a new Training document
    const newTraining = new Training({
      branch,
      trainerOption,
      trainingType,
      trainer,
      trainingCost, // Save cost in numeric format
      employee,
      startDate,
      endDate,
      description,
    });

    // Save the document to the database
    const savedTraining = await newTraining.save();

    // Format the trainingCost for the response
    const formattedResponse = {
      ...savedTraining.toObject(),
      trainingCost: new Intl.NumberFormat('en-IN').format(savedTraining.trainingCost), // Format cost for response
    };

    res.status(201).json({
      message: 'Training created successfully',
      training: formattedResponse,
    });
  } catch (error) {
    res.status(400).json({
      message: 'Failed to create training',
      error: error.message,
    });
  }
};

module.exports = createTraining;
