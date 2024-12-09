const Joi = require("joi");

const ContractNoteCreateValidator = Joi.object({
  contractId: Joi.string().required(),
  note: Joi.string().required(),
});

module.exports = { ContractNoteCreateValidator };
