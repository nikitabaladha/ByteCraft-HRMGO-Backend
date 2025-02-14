const Joi = require("joi");

const PerformanceValidator = Joi.object({
  employeeId: Joi.string().required().messages({
    "string.base": "Employee ID must be a string.",
    "string.empty": "Employee ID cannot be empty.",
    "any.required": "Employee ID is required.",
  }),

  overAllRating: Joi.number().min(0).max(5).required().messages({
    "number.base": "Overall Rating must be a number.",
    "number.min": "Overall Rating must be at least 0.",
    "number.max": "Overall Rating must be at most 5.",
    "any.required": "Overall Rating is required.",
  }),

  targetRating: Joi.number().min(0).max(5).required().messages({
    "number.base": "Target Rating must be a number.",
    "number.min": "Target Rating must be at least 0.",
    "number.max": "Target Rating must be at most 5.",
    "any.required": "Target Rating is required.",
  }),

  addedById: Joi.string().required().messages({
    "string.base": "Added By ID must be a string.",
    "string.empty": "Added By ID cannot be empty.",
    "any.required": "Added By ID is required.",
  }),

  createdAt: Joi.date().required().messages({
    "date.base": "Created At must be a valid date.",
    "any.required": "Created At is required.",
  }),

  appraisalDate: Joi.date().required().messages({
    "date.base": "Appraisal Date must be a valid date.",
    "any.required": "Appraisal Date is required.",
  }),

  remark: Joi.string().optional().messages({
    "string.base": "Remark must be a string.",
    "string.empty": "Remark cannot be empty.",
  }),
});

module.exports = PerformanceValidator;
