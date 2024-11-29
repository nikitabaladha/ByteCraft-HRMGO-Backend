const Joi = require("joi");

const PromotionCreateValidator = Joi.object({
  employeeId: Joi.string().required().messages({
    "any.required": "Employee ID is required.",
    "string.empty": "Employee ID cannot be empty.",
  }),
  designationId: Joi.string().required().messages({
    "any.required": "Designation ID is required.",
    "string.empty": "Designation ID cannot be empty.",
  }),
  promotionTitle: Joi.string().required().messages({
    "any.required": "Promotion title is required.",
  }),
  promotionDate: Joi.date().iso().required().messages({
    "any.required": "Promotion Date is required.",
    "date.base": "Promotion Date must be a valid ISO date.",
  }),

  description: Joi.string().min(1).required().messages({
    "any.required": "Description is required.",
    "string.empty": "Description cannot be empty.",
  }),
});

const PromotionUpdateValidator = Joi.object({
  designationId: Joi.string().required().messages({
    "any.required": "Designation ID is required.",
    "string.empty": "Designation ID cannot be empty.",
  }),
  promotionTitle: Joi.string().required().messages({
    "any.required": "Promotion title is required.",
  }),
  promotionDate: Joi.date().iso().required().messages({
    "any.required": "Promotion Date is required.",
    "date.base": "Promotion Date must be a valid ISO date.",
  }),

  description: Joi.string().min(1).required().messages({
    "any.required": "Description is required.",
    "string.empty": "Description cannot be empty.",
  }),
});

module.exports = { PromotionCreateValidator, PromotionUpdateValidator };
