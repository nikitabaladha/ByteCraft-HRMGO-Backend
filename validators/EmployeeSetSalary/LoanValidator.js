const Joi = require('joi');

const createLoanValidator = Joi.object({
  employeeId: Joi.string().required().messages({
    'string.base': 'Employee ID must be a string.',
    'string.empty': 'Employee ID is required.',
  }),
  employeeName: Joi.string().required().messages({
    'string.base': 'Employee Name must be a string.',
    'string.empty': 'Employee Name is required.',
  }),
  loanOption: Joi.string()
    .required()
    .messages({
      'string.base': 'Loan Option must be a string.',
      'string.empty': 'Loan Option is required.',
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
  reason: Joi.string().required().messages({
    'string.base': 'Reason must be a string.',
    'string.empty': 'Reason is required.',
  }),
});

module.exports = createLoanValidator;
