const Joi = require("joi");

const signupValidationSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.base": "First name must be a string.",
    "string.empty": "First name cannot be empty.",
    "any.required": "First name is required.",
  }),

  email: Joi.string().email().required().messages({
    "string.base": "Email must be a string.",
    "string.empty": "Email cannot be empty.",
    "string.email": "Email must be a valid email address.",
    "any.required": "Email is required.",
  }),

  password: Joi.string().min(6).required().messages({
    "string.base": "Password must be a string.",
    "string.empty": "Password cannot be empty.",
    "string.min": "Password must be at least 6 characters long.",
    "any.required": "Password is required.",
  }),

  role: Joi.string().valid("company", "hr", "employee").required().messages({
    "string.base": "Role must be a string.",
    "any.only":
      'Role must be one of the following: "company", "hr", or "employee".',
    "any.required": "Role is required.",
  }),
});

module.exports = signupValidationSchema;
