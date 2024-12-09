const Joi = require("joi");

const ContractCommentCreateValidator = Joi.object({
  userId: Joi.string().required(),
  contractId: Joi.string().required(),
  comment: Joi.string().required(),
});

module.exports = { ContractCommentCreateValidator };
