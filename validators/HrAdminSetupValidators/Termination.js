const Joi = require("joi");

const TerminationCreateValidator = Joi.object({
  employeeId: Joi.string().required().messages({
    "any.required": "Employee ID is required.",
    "string.empty": "Employee ID cannot be empty.",
  }),
  terminationTypeId: Joi.string().required().messages({
    "any.required": "Termination type is required.",
    "string.empty": "Termination type cannot be empty.",
  }),
  noticeDate: Joi.date().iso().required().messages({
    "any.required": "Notice Date is required.",
    "date.base": "Notice Date must be a valid ISO date.",
  }),
  terminationDate: Joi.date()
    .iso()
    .greater(Joi.ref("noticeDate"))
    .required()
    .messages({
      "any.required": "Termination Date is required.",
      "date.base": "Termination Date must be a valid ISO date.",
      "date.greater": "Termination Date must be after Notice Date.",
    }),

  description: Joi.string().min(1).required().messages({
    "any.required": "Description is required.",
    "string.empty": "Description cannot be empty.",
  }),
});

const TerminationUpdateValidator = Joi.object({
  terminationTypeId: Joi.string().required().messages({
    "any.required": "Termination type is required.",
    "string.empty": "Termination type cannot be empty.",
  }),
  noticeDate: Joi.date().iso().required().messages({
    "any.required": "Notice Date is required.",
    "date.base": "Notice Date must be a valid ISO date.",
  }),
  terminationDate: Joi.date()
    .iso()
    .greater(Joi.ref("noticeDate"))
    .required()
    .messages({
      "any.required": "Termination Date is required.",
      "date.base": "Termination Date must be a valid ISO date.",
      "date.greater": "Termination Date must be after Notice Date.",
    }),

  description: Joi.string().min(1).required().messages({
    "any.required": "Description is required.",
    "string.empty": "Description cannot be empty.",
  }),
});

module.exports = { TerminationCreateValidator, TerminationUpdateValidator };
