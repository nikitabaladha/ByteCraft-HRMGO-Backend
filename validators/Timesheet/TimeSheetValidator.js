const Joi = require("joi");

const TimeSheetValidator = Joi.object({
  employeeId: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      "string.pattern.base": "Invalid employeeId format",
      "any.required": "Employee ID is required",
    }),

  date: Joi.date().max("now").required().messages({
    "date.max": "Date cannot be in the future",
    "any.required": "Date is required",
  }),

  remark: Joi.string().min(5).max(500).trim().required().messages({
    "string.min": "Remark should have at least 5 characters",
    "string.max": "Remark should not exceed 500 characters",
    "any.required": "Remark is required",
  }),

  hours: Joi.number().positive().required().messages({
    "number.positive": "Hours should be a positive number",
    "any.required": "Hours are required",
  }),
});

module.exports = TimeSheetValidator;
