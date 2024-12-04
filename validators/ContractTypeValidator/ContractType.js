const Joi = require("joi");

const ContractType = Joi.object({
  contractName: Joi.string().required(),
});

module.exports = ContractType;
