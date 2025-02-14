const Joi = require("joi");

const CompetencyValidator = Joi.object({
  competencyType: Joi.string().required(),
});

module.exports = CompetencyValidator;
