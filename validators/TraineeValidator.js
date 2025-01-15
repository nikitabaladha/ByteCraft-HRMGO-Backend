const Joi = require("joi");

// Country-specific regex for contact numbers (e.g., +1 for USA, +91 for India, etc.)
const contactNumberPattern = /^\+\d{1,3}[- ]?\d{6,14}$/;

const traineeValidationSchema = Joi.object({
  branch: Joi.string().min(2).max(100).required().messages({
    // "string.base": "Branch must be a string",
    // "string.empty": "Branch cannot be empty",
    // "string.min": "Branch must be at least 2 characters long",
    // "string.max": "Branch must be less than or equal to 100 characters",
    "any.required": "Branch is required",
  }),

  firstName: Joi.string().min(3).max(100).required().messages({
    "string.base": "First name must be a string",
    "string.empty": "First name cannot be empty",
    
  }),

  lastName: Joi.string().min(3).max(100).required().messages({
    "string.base": "Last name must be a string",
    "string.empty": "Last name cannot be empty",
  }),

  contactNumber: Joi.string()
    .pattern(contactNumberPattern)
    .required()
    .messages({
      "string.pattern.base":
        "Contact number must start with a country code (e.g., +91, +1) and contain 6-14 digits after the code.",
      "string.empty": "Contact number cannot be empty",
      "any.required": "Contact number is required",
    }),

  email: Joi.string().email().required().messages({
    "string.email": "Email must be a valid email address",
    "string.empty": "Email cannot be empty",
    "any.required": "Email is required",
  }),

  expertise: Joi.string().min(3).max(100).required().messages({
    "string.base": "Expertise must be a string",
    "string.empty": "Expertise cannot be empty",
    "string.min": "Expertise must be at least 3 characters long",
    "string.max": "Expertise must be less than or equal to 100 characters",
    "any.required": "Expertise is required",
  }),

  address: Joi.string().min(5).max(200).required().messages({
    "string.base": "Address must be a string",
    "string.empty": "Address cannot be empty",
    "string.min": "Address must be at least 5 characters long",
    "string.max": "Address must be less than or equal to 200 characters",
    "any.required": "Address is required",
  }),
});

module.exports = traineeValidationSchema;
