const Training = require('../../../models/TrainingList');

const getAllTrainings = async (req, res) => {
    try {
      const trainings = await Training.find();
  
      if (trainings.length === 0) {
        return res.status(404).json({
          message: 'No training records found',
        });
      }
  
      res.status(200).json({
        message: 'Trainings retrieved successfully',
      data: trainings,
      });
    } catch (error) {
      res.status(400).json({
        message: 'Failed to retrieve trainings',
        error: error.message,
      });
    }
  };
  
  module.exports = getAllTrainings
  