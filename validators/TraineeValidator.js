const Joi = require("joi");

const branchValidationSchema = Joi.object({
  employeeId: Joi.string()
    .required()
    .regex(/^[0-9a-fA-F]{24}$/) // Validates MongoDB ObjectId format
    .messages({
      "string.pattern.base": "Invalid employee ID format.",
    }),
  name: Joi.string()
    .required()
    .messages({
      "any.required": "Branch name is required.",
      "string.base": "Branch name must be a string.",
    }),
  contactNumber: Joi.string()
    .required()
    .pattern(/^(\+?\d{1,3}[- ]?)?\d{10}$/)
    .messages({
      "any.required": "Contact number is required.",
      "string.pattern.base": "Invalid contact number format.",
    }),
  email: Joi.string()
    .required()
    .email()
    .messages({
      "any.required": "Email is required.",
      "string.email": "Invalid email address format.",
    }),
  expertise: Joi.string()
    .required()
    .messages({
      "any.required": "Expertise is required.",
      "string.base": "Expertise must be a string.",
    }),
  Address: Joi.string()
    .required()
    .messages({
      "any.required": "Address is required.",
      "string.base": "Address must be a string.",
    }),
});

// Export a validation function
const validateBranch = (branchData) => {
  return branchValidationSchema.validate(branchData, { abortEarly: false });
};

module.exports = { validateBranch };
