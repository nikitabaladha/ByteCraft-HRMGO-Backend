const Joi = require("joi");

const BranchValidator = Joi.object({
  branchName: Joi.string().required().messages({
    "string.base": "Branch name must be a string.",
    "string.empty": "Branch name cannot be empty.",
    "any.required": "Branch name is required.",
  }),
});

module.exports = BranchValidator;
