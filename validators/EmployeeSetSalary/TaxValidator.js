const Joi = require('joi');

const createTaxValidator = Joi.object({
  employeeId: Joi.string().required().messages({
    'string.base': 'Employee ID must be a string.',
    'string.empty': 'Employee ID is required.',
  }),
  employeeName: Joi.string().required().messages({
    'string.base': 'Employee Name must be a string.',
    'string.empty': 'Employee Name is required.',
  }),
  taxes: Joi.string()
    .valid('GST', 'IGST', 'SGST')
    .required()
    .messages({
      'string.base': 'Taxes must be a string.',
      'string.empty': 'Taxes is required.',
      'any.only': 'Taxes must be either "GST", "IGST", or "SGST".',
    }),
  title: Joi.string().required().messages({
    'string.base': 'Title must be a string.',
    'string.empty': 'Title is required.',
  }),
  type: Joi.string()
    .valid('Fixed', 'Percentage')
    .required()
    .messages({
      'string.base': 'Type must be a string.',
      'string.empty': 'Type is required.',
      'any.only': 'Type must be either "Fixed" or "Percentage".',
    }),
  amount: Joi.number()
    .positive()
    .required()
    .messages({
      'number.base': 'Amount must be a number.',
      'number.empty': 'Amount is required.',
      'number.positive': 'Amount must be a positive value.',
    }),
});

module.exports = createTaxValidator;
