const Joi = require("joi");

const DesignationValidator = Joi.object({
  designationName: Joi.string().required(),
  departmentId: Joi.string().required(),
});

module.exports = DesignationValidator;
