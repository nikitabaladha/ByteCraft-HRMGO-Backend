const Joi = require("joi");

const AttendanceValidator = Joi.object({
  name: Joi.string().required().messages({
    "string.base": "Name must be a string.",
    "string.empty": "Name cannot be empty.",
    "any.required": "Name is required.",
  }),

  status: Joi.string().required().messages({
    "string.base": "Status must be a string.",
    "string.empty": "Status cannot be empty.",
    "any.required": "Status is required.",
  }),
});

module.exports = AttendanceValidator;
