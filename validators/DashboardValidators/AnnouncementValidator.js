const Joi = require("joi");

const AnnouncementValidator = Joi.object({
  title: Joi.string().required().messages({
    "string.base": "Title must be a string.",
    "string.empty": "Title cannot be empty.",
    "any.required": "Title is required.",
  }),

  startDate: Joi.date().required().messages({
    "date.base": "Start date must be a valid date.",
    "any.required": "Start date is required.",
  }),

  endDate: Joi.date().required().messages({
    "date.base": "End date must be a valid date.",
    "any.required": "End date is required.",
  }),

  description: Joi.string().required().messages({
    "string.base": "Description must be a string.",
    "string.empty": "Description cannot be empty.",
    "any.required": "Description is required.",
  }),
});

module.exports = AnnouncementValidator;
