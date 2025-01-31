const Joi = require('joi');

const userValidationSchema = Joi.object({
  name: Joi.string()
    .trim()
    .required()
    .messages({
      'string.empty': 'Name is required.',
    }),
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'A valid email is required.',
      'string.empty': 'Email is required.',
    }),
  role: Joi.string()
    .valid('HR', 'Accountant', 'Manager')
    .required()
    .messages({
      'any.only': 'Role must be HR, Accountant, or Manager.',
      'string.empty': 'Role is required.',
    }),
  password: Joi.when('passwordSwitch', {
    is: true,
    then: Joi.string()
      .min(6)
      .required()
      .messages({
        'string.min': 'Password must be at least 6 characters long.',
        'string.empty': 'Password is required when login is enabled.',
      }),
    otherwise: Joi.forbidden(),
  }),
  passwordSwitch: Joi.boolean().default(false),
});

// Export the validator
const validateUser = (data) => userValidationSchema.validate(data, { abortEarly: false });

module.exports = validateUser;
