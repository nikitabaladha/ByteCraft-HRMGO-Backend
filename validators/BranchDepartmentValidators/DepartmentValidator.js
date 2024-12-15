const Joi = require("joi");

const DepartmentValidator = Joi.object({
  departmentName: Joi.string().required().messages({
    "string.base": "Department name must be a string.",
    "string.empty": "Department name cannot be empty.",
    "any.required": "Department name is required.",
  }),
  branchId: Joi.string().required().messages({
    "string.base": "Branch ID must be a string.",
    "string.empty": "Branch ID cannot be empty.",
    "any.required": "Branch ID is required.",
  }),
});

module.exports = DepartmentValidator;
