const Joi = require("joi");

const ContractCommentCreateValidator = Joi.object({
  contractId: Joi.string().required(),
  comment: Joi.string().required(),
});

module.exports = { ContractCommentCreateValidator };
