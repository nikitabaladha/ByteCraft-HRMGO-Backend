const Joi = require('joi');

const salarySchema = Joi.object({
  employeeId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/) 
    .required()
    .messages({
      'string.pattern.base': 'Invalid Employee ID format',
      'string.empty': 'Employee ID is required',
      'any.required': 'Employee ID is required',
    }),
  salaryType: Joi.string()
    .required()
    .messages({
      'string.empty': 'Salary type is required',
      'any.required': 'Salary type is required',
    }),
  salary: Joi.number()
    .positive()
    .required()
    .messages({
      'number.positive': 'Salary must be a positive number',
      'number.base': 'Salary must be a number',
      'any.required': 'Salary is required',
    }),
  grandTotal: Joi.number()
    .required()
    .messages({
      'number.base': 'Grand total must be a number',
      'any.required': 'Grand total is required',
    }),
});

module.exports = salarySchema;
