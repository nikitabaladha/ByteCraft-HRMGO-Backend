const Joi = require("joi");

const CompetencyListValidator = Joi.object({
  competencyListName: Joi.string().required().messages({
    "string.base": "Competency List Name must be a string.",
    "string.empty": "Competency List Name cannot be empty.",
    "any.required": "Competency List Name is required.",
  }),
  competencyId: Joi.string()
    .length(24) // Validate that it is a valid ObjectId
    .required()
    .messages({
      "string.base": "Competency ID must be a string.",
      "string.empty": "Competency ID cannot be empty.",
      "string.length": "Competency ID must be a valid 24 character ObjectId.",
      "any.required": "Competency ID is required.",
    }),
});

module.exports = CompetencyListValidator;
