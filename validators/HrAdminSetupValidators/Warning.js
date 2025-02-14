const Joi = require("joi");

const WarningCreateValidator = Joi.object({
  warningById: Joi.string().required().messages({
    "any.required": "Warning By Id is required.",
    "string.empty": "Warning By Id cannot be empty.",
  }),
  warningToId: Joi.string().required().messages({
    "any.required": "Warning To Id is required.",
    "string.empty": "Warning To Id cannot be empty.",
  }),
  subject: Joi.string().required().messages({
    "any.required": "Warning subject is required.",
  }),
  warningDate: Joi.date().iso().required().messages({
    "any.required": "warning Date is required.",
    "date.base": "warning Date must be a valid ISO date.",
  }),
  description: Joi.string().min(1).required().messages({
    "any.required": "Description is required.",
    "string.empty": "Description cannot be empty.",
  }),
});

const WarningUpdateValidator = Joi.object({
  warningToId: Joi.string().required().messages({
    "any.required": "Warning To Id is required.",
    "string.empty": "Warning To Id cannot be empty.",
  }),
  subject: Joi.string().required().messages({
    "any.required": "Warning subject is required.",
  }),
  warningDate: Joi.date().iso().required().messages({
    "any.required": "warning Date is required.",
    "date.base": "warning Date must be a valid ISO date.",
  }),
  description: Joi.string().min(1).required().messages({
    "any.required": "Description is required.",
    "string.empty": "Description cannot be empty.",
  }),
});

module.exports = { WarningCreateValidator, WarningUpdateValidator };
