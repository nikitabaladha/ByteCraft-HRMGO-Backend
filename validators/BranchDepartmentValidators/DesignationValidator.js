const Joi = require("joi");

const DesignationValidator = Joi.object({
  designationName: Joi.string().required().messages({
    "string.base": "Designation name must be a string.",
    "string.empty": "Designation name cannot be empty.",
    "any.required": "Designation name is required.",
  }),
  departmentId: Joi.string().required().messages({
    "string.base": "Department ID must be a string.",
    "string.empty": "Department ID cannot be empty.",
    "any.required": "Department ID is required.",
  }),
  branchId: Joi.string().required().messages({
    "string.base": "Branch ID must be a string.",
    "string.empty": "Branch ID cannot be empty.",
    "any.required": "Branch ID is required.",
  }),
});

module.exports = DesignationValidator;