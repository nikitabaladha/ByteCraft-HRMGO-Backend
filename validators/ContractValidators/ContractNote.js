const Joi = require("joi");

const ContractNoteCreateValidator = Joi.object({
  contractId: Joi.string().required().messages({
    "string.base": "Contract ID must be a string.",
    "string.empty": "Contract ID cannot be empty.",
    "any.required": "Contract ID is required.",
  }),
  note: Joi.string().required().messages({
    "string.base": "Note must be a string.",
    "string.empty": "Note cannot be empty.",
    "any.required": "Note is required.",
  }),
});

module.exports = { ContractNoteCreateValidator };
