const Joi = require("joi");

const ComplaintCreateValidator = Joi.object({
  complaintFromId: Joi.string().required().messages({
    "any.required": "Complaint From Id is required.",
    "string.empty": "Complaint From Id cannot be empty.",
  }),
  complaintAgainstId: Joi.string().required().messages({
    "any.required": "Complaint Against Id is required.",
    "string.empty": "Complaint From Id cannot be empty.",
  }),
  title: Joi.string().required().messages({
    "any.required": "Complaint title is required.",
  }),
  complaintDate: Joi.date().iso().required().messages({
    "any.required": "Complaint Date is required.",
    "date.base": "Complaint Date must be a valid ISO date.",
  }),
  description: Joi.string().min(1).required().messages({
    "any.required": "Description is required.",
    "string.empty": "Description cannot be empty.",
  }),
});

const ComplaintUpdateValidator = Joi.object({
  complaintAgainstId: Joi.string().required().messages({
    "any.required": "Complaint Against Id is required.",
    "string.empty": "Complaint From Id cannot be empty.",
  }),
  title: Joi.string().required().messages({
    "any.required": "Complaint title is required.",
  }),
  complaintDate: Joi.date().iso().required().messages({
    "any.required": "Complaint Date is required.",
    "date.base": "Complaint Date must be a valid ISO date.",
  }),
  description: Joi.string().min(1).required().messages({
    "any.required": "Description is required.",
    "string.empty": "Description cannot be empty.",
  }),
});

module.exports = { ComplaintCreateValidator, ComplaintUpdateValidator };
