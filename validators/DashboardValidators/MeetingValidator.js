const Joi = require("joi");

const MeetingValidator = Joi.object({
  title: Joi.string().required().messages({
    "string.base": "Title must be a string.",
    "string.empty": "Title cannot be empty.",
    "any.required": "Title is required.",
  }),

  date: Joi.date().required().messages({
    "date.base": "Date must be a valid date.",
    "any.required": "Date is required.",
  }),

  time: Joi.string()
    .pattern(/^([1-9]|1[0-2]):[0-5][0-9] [APap][Mm]$/)
    .required()
    .messages({
      "string.base": "Time must be a string.",
      "string.empty": "Time cannot be empty.",
      "string.pattern.base": 'Time must be in the format "HH:MM AM/PM".',
      "any.required": "Time is required.",
    }),
});

module.exports = MeetingValidator;
