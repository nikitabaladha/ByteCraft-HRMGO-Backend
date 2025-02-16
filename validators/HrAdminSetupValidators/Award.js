const Joi = require("joi");

const AwardCreateValidator = Joi.object({
  employeeId: Joi.string().required().messages({
    "any.required": "Employee ID is required.",
    "string.empty": "Employee ID cannot be empty.",
  }),
  awardTypeId: Joi.string().required().messages({
    "any.required": "Award type is required.",
    "string.empty": "Award type cannot be empty.",
  }),
  date: Joi.date().iso().required().messages({
    "any.required": "Date is required.",
    "date.base": "Date must be a valid ISO date.",
  }),
  gift: Joi.string().min(1).required().messages({
    "any.required": "Gift is required.",
    "string.empty": "Gift cannot be empty.",
  }),
  description: Joi.string().min(1).required().messages({
    "any.required": "Description is required.",
    "string.empty": "Description cannot be empty.",
  }),
});

const AwardUpdateValidator = Joi.object({
  awardTypeId: Joi.string().required().messages({
    "any.required": "Award type is required.",
    "string.empty": "Award type cannot be empty.",
  }),
  date: Joi.date().iso().required().messages({
    "any.required": "Date is required.",
    "date.base": "Date must be a valid ISO date.",
  }),
  gift: Joi.string().min(1).required().messages({
    "any.required": "Gift is required.",
    "string.empty": "Gift cannot be empty.",
  }),
  description: Joi.string().min(1).required().messages({
    "any.required": "Description is required.",
    "string.empty": "Description cannot be empty.",
  }),
});

module.exports = { AwardCreateValidator, AwardUpdateValidator };
