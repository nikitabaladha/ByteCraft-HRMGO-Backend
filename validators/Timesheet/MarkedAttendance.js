const Joi = require("joi");

const MarkedAttendanceValidator = Joi.object({
  employeeId: Joi.string().required().messages({
    "string.base": "Employee ID must be a string.",
    "string.empty": "Employee ID cannot be empty.",
    "any.required": "Employee ID is required.",
  }),

  date: Joi.date().iso().required().messages({
    "date.base": "Date must be a valid date.",
    "date.iso": "Date must be in ISO format (YYYY-MM-DD).",
    "any.required": "Date is required.",
  }),

  status: Joi.string().valid("Present", "Absent").required().messages({
    "string.base": "Status must be a string.",
    "any.only": 'Status must be either "Present" or "Absent".',
    "any.required": "Status is required.",
  }),

  clockIn: Joi.date().iso().required().messages({
    "date.base": "Clock In must be a valid date.",
    "date.iso": "Clock In must be in ISO format (YYYY-MM-DDTHH:mm:ssZ).",
    "any.required": "Clock In is required.",
  }),

  clockOut: Joi.date().iso().required().messages({
    "date.base": "Clock Out must be a valid date.",
    "date.iso": "Clock Out must be in ISO format (YYYY-MM-DDTHH:mm:ssZ).",
    "any.required": "Clock Out is required.",
  }),

  late: Joi.string().optional().messages({
    "string.base": "Late must be a string.",
    "string.empty": "Late cannot be empty.",
  }),

  earlyLeaving: Joi.string().optional().messages({
    "string.base": "Early Leaving must be a string.",
    "string.empty": "Early Leaving cannot be empty.",
  }),

  overtime: Joi.string().optional().messages({
    "string.base": "Overtime must be a string.",
    "string.empty": "Overtime cannot be empty.",
  }),
  id: Joi.string().optional().messages({
    "string.base": "Id must be a string.",
  }),
});

const MarkedUpdateUpdateValidator = Joi.object({
  clockIn: Joi.date().iso().required().messages({
    "date.base": "Clock In must be a valid date.",
    "date.iso": "Clock In must be in ISO format (YYYY-MM-DDTHH:mm:ssZ).",
    "any.required": "Clock In is required.",
  }),

  clockOut: Joi.date().iso().required().messages({
    "date.base": "Clock Out must be a valid date.",
    "date.iso": "Clock Out must be in ISO format (YYYY-MM-DDTHH:mm:ssZ).",
    "any.required": "Clock Out is required.",
  }),
});

module.exports = { MarkedAttendanceValidator, MarkedUpdateUpdateValidator };
