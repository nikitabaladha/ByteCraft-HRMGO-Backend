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
    .valid('Monthly Payslip', 'Hourly Payslip')
    .required()
    .messages({
      'any.only': 'Salary type must be either "Monthly Payslip" or "Hourly Payslip"',
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
});

module.exports = salarySchema;
