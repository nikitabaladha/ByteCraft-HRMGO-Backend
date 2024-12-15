const Joi = require("joi");

const DashboardMetricValidator = Joi.object({
  title: Joi.string().required().messages({
    "string.base": "Title must be a string.",
    "string.empty": "Title cannot be empty.",
    "any.required": "Title is required.",
  }),

  subtitle: Joi.string().required().messages({
    "string.base": "Subtitle must be a string.",
    "string.empty": "Subtitle cannot be empty.",
    "any.required": "Subtitle is required.",
  }),

  value: Joi.number().required().messages({
    "number.base": "Value must be a number.",
    "any.required": "Value is required.",
  }),
});

module.exports = DashboardMetricValidator;
