const Joi = require("joi");

const IncomeExpenseChartValidator = Joi.object({
  categories: Joi.date().required({
    "date.base": "Categories data must be a valid date.",
    "any.required": "Categories data is required.",
  }),
  incomeData: Joi.number().required().min(0).messages({
    "number.base": "Income data must be a number.",
    "number.min": "Income data must be at least 0.",
    "any.required": "Income data is required.",
  }),
  expenseData: Joi.number().required().min(0).messages({
    "number.base": "Expense data must be a number.",
    "number.min": "Expense data must be at least 0.",
    "any.required": "Expense data is required.",
  }),
});

module.exports = IncomeExpenseChartValidator;
