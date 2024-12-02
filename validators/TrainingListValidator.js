const Joi = require('joi');

const validateTraining = (trainingData) => {
  const schema = Joi.object({
    branch: Joi.string().required().label('Branch'),
    trainerOption: Joi.string()
      .valid('Internal', 'External')
      .required()
      .label('Trainer Option'),
    trainingType: Joi.string().required().label('Training Type'),
    trainer: Joi.string().required().label('Trainer'),
    trainingCost: Joi.number()
      .min(0)
      .required()
      .label('Training Cost'),
    // employee: Joi.string()
    //   .regex(/^[a-f\d]{24}$/i) // Validates MongoDB ObjectId
    //   .required()
    //   .label('Employee ID'),
    startDate: Joi.date().required().label('Start Date'),
    endDate: Joi.date()
      .greater(Joi.ref('startDate'))
      .required()
      .label('End Date'),
    description: Joi.string()
      .max(500)
      .allow('')
      .label('Description'),
  });

  return schema.validate(trainingData, { abortEarly: false }); // Returns all errors at once
};

module.exports = validateTraining;
