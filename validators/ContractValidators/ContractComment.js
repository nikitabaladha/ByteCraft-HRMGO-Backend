const Joi = require("joi");

const ContractCommentCreateValidator = Joi.object({
  contractId: Joi.string().required().messages({
    "string.base": "Contract ID must be a string.",
    "string.empty": "Contract ID cannot be empty.",
    "any.required": "Contract ID is required.",
  }),
  comment: Joi.string().required().messages({
    "string.base": "Comment must be a string.",
    "string.empty": "Comment cannot be empty.",
    "any.required": "Comment is required.",
  }),
});

module.exports = { ContractCommentCreateValidator };
