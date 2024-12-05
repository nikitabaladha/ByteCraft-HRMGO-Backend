const Joi = require('joi');

// Joi schema for job validation
const validateJob = Joi.object({
  title: Joi.string().required().messages({
    'string.empty': 'Title is required.',
    'any.required': 'Title is required.',
  }),
  branch: Joi.string().required().messages({
    'string.empty': 'Branch is required.',
    'any.required': 'Branch is required.',
  }),
  category: Joi.string().required().messages({
    'string.empty': 'Category is required.',
    'any.required': 'Category is required.',
  }),
  position: Joi.number().integer().min(1).required().messages({
    'number.base': 'Position must be a number.',
    'number.min': 'Position must be at least 1.',
    'any.required': 'Position is required.',
  }),
  status: Joi.string().valid('active', 'in_active').required().messages({
    'any.only': 'Status must be either "active" or "in_active".',
    'any.required': 'Status is required.',
  }),
  startDate: Joi.date().optional().allow(null),
  endDate: Joi.date().min(Joi.ref('startDate')).optional().allow(null).messages({
    'date.min': 'End date must be after the start date.',
  }),
  skill: Joi.array().items(Joi.string()).min(1).required().messages({
    'array.base': 'Skills must be an array of strings.',
    'array.min': 'At least one skill is required.',
    'any.required': 'Skills are required.',
  }),
  applicant: Joi.array().items(Joi.string().valid('Gender', 'Date of Birth', 'Address')).optional().messages({
    'array.includesOnly': 'Applicant options must be one of "Gender", "Date of Birth", or "Address".',
  }),
  visibility: Joi.array().items(Joi.string().valid('Profile', 'Resume', 'Letter', 'Terms and Conditions')).optional().messages({
    'array.includesOnly': 'Visibility options must be one of "Profile", "Resume", "Letter", or "Terms and Conditions".',
  }),
  customQuestions: Joi.array().items(Joi.string().valid(
    'What Do You Know About This Job?',
    'Why do you want this job?',
    'Why do you want to work this company?'
  )).optional().messages({
    'array.includesOnly': 'Custom questions must be from the predefined list.',
  }),
  description: Joi.string().max(1000).required().messages({
    'string.empty': 'Description is required.',
    'string.max': 'Description must not exceed 1000 characters.',
    'any.required': 'Description is required.',
  }),
  requirement: Joi.string().max(1000).required().messages({
    'string.empty': 'Requirement is required.',
    'string.max': 'Requirement must not exceed 1000 characters.',
    'any.required': 'Requirement is required.',
  }),
  terms: Joi.string().max(1000).optional().allow(null).messages({
    'string.max': 'Terms must not exceed 1000 characters.',
  }),
});

// Function to validate the job data
function validateJobData(jobData) {
  return validateJob.validate(jobData, { abortEarly: false }); // Collect all errors, if any
}

module.exports = validateJobData;
