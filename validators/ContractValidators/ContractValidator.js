const Joi = require("joi");

const ContractCreateValidator = Joi.object({
  employeeId: Joi.string().required(),
  subject: Joi.string().required(),
  value: Joi.number().required().min(0),
  contractTypeId: Joi.string().required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().required().greater(Joi.ref("startDate")),
  status: Joi.string().valid("Decline", "Accept", "Pending").default("Pending"),
  description: Joi.string().optional(),
  attachmentUrl: Joi.array().items(Joi.string().uri()).optional(),
  comments: Joi.array().items(Joi.string()).optional(),
  notes: Joi.array().items(Joi.string()).optional(),
});

const ContractUpdateValidator = Joi.object({
  employeeId: Joi.string().required(),
  subject: Joi.string().required(),
  value: Joi.number().required().min(0),
  contractTypeId: Joi.string().required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().required().greater(Joi.ref("startDate")),
  status: Joi.string().valid("Decline", "Accept", "Pending").default("Pending"),
  description: Joi.string().optional(),
  attachmentUrl: Joi.array().items(Joi.string().uri()).optional(),
  comments: Joi.array().items(Joi.string()).optional(),
  notes: Joi.array().items(Joi.string()).optional(),
});

module.exports = { ContractCreateValidator, ContractUpdateValidator };
