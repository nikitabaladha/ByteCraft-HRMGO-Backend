const Joi = require("joi");

const ContractCreateValidator = Joi.object({
  employeeId: Joi.string().required().messages({
    "string.base": "Employee ID must be a string.",
    "any.required": "Employee ID is required.",
  }),
  subject: Joi.string().required().messages({
    "string.base": "Subject must be a string.",
    "any.required": "Subject is required.",
  }),
  value: Joi.number().required().min(0).messages({
    "number.base": "Value must be a number.",
    "number.min": "Value must be greater than or equal to 0.",
    "any.required": "Value is required.",
  }),
  contractTypeId: Joi.string().required().messages({
    "string.base": "Contract Type ID must be a string.",
    "any.required": "Contract Type ID is required.",
  }),
  startDate: Joi.date().required().messages({
    "date.base": "Start date must be a valid date.",
    "any.required": "Start date is required.",
  }),
  endDate: Joi.date().required().greater(Joi.ref("startDate")).messages({
    "date.base": "End date must be a valid date.",
    "date.greater": "End date must be greater than the start date.",
    "any.required": "End date is required.",
  }),
  status: Joi.string()
    .valid("Decline", "Accept", "Pending")
    .default("Pending")
    .messages({
      "any.only": "Status must be one of Decline, Accept, or Pending.",
    }),
  description: Joi.string().optional().messages({
    "string.base": "Description must be a string.",
  }),
});

const ContractUpdateValidator = Joi.object({
  employeeId: Joi.string().required().messages({
    "string.base": "Employee ID must be a string.",
    "any.required": "Employee ID is required.",
  }),
  subject: Joi.string().required().messages({
    "string.base": "Subject must be a string.",
    "any.required": "Subject is required.",
  }),
  value: Joi.number().required().min(0).messages({
    "number.base": "Value must be a number.",
    "number.min": "Value must be greater than or equal to 0.",
    "any.required": "Value is required.",
  }),
  contractTypeId: Joi.string().required().messages({
    "string.base": "Contract Type ID must be a string.",
    "any.required": "Contract Type ID is required.",
  }),
  startDate: Joi.date().required().messages({
    "date.base": "Start date must be a valid date.",
    "any.required": "Start date is required.",
  }),
  endDate: Joi.date().required().greater(Joi.ref("startDate")).messages({
    "date.base": "End date must be a valid date.",
    "date.greater": "End date must be greater than the start date.",
    "any.required": "End date is required.",
  }),
  status: Joi.string()
    .valid("Decline", "Accept", "Pending")
    .default("Pending")
    .messages({
      "any.only": "Status must be one of Decline, Accept, or Pending.",
    }),
  description: Joi.string().optional().messages({
    "string.base": "Description must be a string.",
  }),
});

module.exports = { ContractCreateValidator, ContractUpdateValidator };
