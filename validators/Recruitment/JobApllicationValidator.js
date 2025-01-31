const Joi = require("joi");

const validateAge = (dob) => {
  const today = new Date();
  const birthDate = new Date(dob);
  const age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  
  if (age < 18 || (age === 18 && m < 0)) {
    return false;
  }
  return true;
};

const jobApplicationValidator = Joi.object({
  jobTitle: Joi.string()
    .required()
    .messages({
      "string.base": "Job title must be a string.",
      "any.required": "Job title is required.",
    }),
  name: Joi.string()
    .required()
    .messages({
      "string.base": "Name must be a string.",
      "any.required": "Name is required.",
    }),
  email: Joi.string()
    .email()
    .required()
    .messages({
      "string.email": "Please provide a valid email address.",
      "any.required": "Email is required.",
    }),
  phone: Joi.string()
    .pattern(/^\+\d{1,3}\d{9,13}$/)
    .required()
    .messages({
      "string.pattern.base":
        "Phone number must include country code (e.g., +91) and have 9-13 digits.",
      "any.required": "Phone number is required.",
    }),
    dob: Joi.date().custom((value, helpers) => {
      if (!validateAge(value)) {
        return helpers.message('Applicant must be 18 years or older');
      }
      return value;
    }).optional(),
  gender: Joi.string()
    .valid("Male", "Female")
    .optional()
    .messages({
      "any.only": "Gender must be either 'Male' or 'Female'.",
    }),
  address: Joi.string()
    .optional()
    .messages({
      "string.base": "Address must be a string.",
    }),
  city: Joi.string()
    .optional()
    .messages({
      "string.base": "City must be a string.",
    }),
  state: Joi.string()
    .optional()
    .messages({
      "string.base": "State must be a string.",
    }),
  country: Joi.string()
    .optional()
    .messages({
      "string.base": "Country must be a string.",
    }),
  zipCode: Joi.string()
    .optional()
    .messages({
      "string.base": "Zip Code must be a string.",
    }),
  // profile: Joi.string()
  //   .uri()
  //   .optional()
  //   .messages({
  //     "string.uri": "Profile must be a valid URL.",
  //   }),
  // resume: Joi.string()
  //   .uri()
  //   .optional()
  //   .messages({
  //     "string.uri": "Resume must be a valid URL.",
  //   }),
  coverLetter: Joi.string()
    .optional()
    .messages({
      "string.base": "Cover letter must be a string.",
    }),
  customQuestions: Joi.object()
    .pattern(Joi.string(), Joi.string())
    .optional()
    .messages({
      "object.base": "Custom questions must be a key-value pair object.",
    }),
});

module.exports = jobApplicationValidator;
