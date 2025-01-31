const Joi = require("joi");

const signupValidationSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  // password: Joi.string().min(6).required(),
  password: Joi.string().optional(),
  role: Joi.string().required(),
});

module.exports = signupValidationSchema;
