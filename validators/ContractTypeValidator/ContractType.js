const Joi = require("joi");

const ContractType = Joi.object({
  contractName: Joi.string().required().messages({
    "string.base": "Contract name must be a string.",
    "string.empty": "Contract name cannot be empty.",
    "any.required": "Contract name is required.",
  }),
});

module.exports = ContractType;
