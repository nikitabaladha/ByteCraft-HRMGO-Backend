const Joi = require("joi");
const User = require("../../models/User"); // Import the User model (assuming it's in models/User.js)

const PerformanceValidator = Joi.object({
  employeeId: Joi.string().required(), // Validate employeeId as a string
  overAllRating: Joi.number().min(0).max(5).required(),
  targetRating: Joi.number().min(0).max(5).required(),
  addedById: Joi.string().required(),
  createdAt: Joi.date().required(),
  appraisalDate: Joi.date().required(),
  remark: Joi.string().optional(),
});

module.exports = PerformanceValidator;
