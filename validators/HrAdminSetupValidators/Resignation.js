const Joi = require("joi");

const ResignationCreateValidator = Joi.object({
  employeeId: Joi.string().required().messages({
    "any.required": "Employee ID is required.",
    "string.empty": "Employee ID cannot be empty.",
  }),

  resignationDate: Joi.date().iso().required().messages({
    "any.required": "Resignation date is required.",
    "date.base": "Resignation date must be a valid ISO date.",
  }),

  lastWorkingDay: Joi.date()
    .iso()
    .greater(Joi.ref("resignationDate"))
    .required()
    .messages({
      "any.required": "Last working day is required.",
      "date.base": "Last working day must be a valid ISO date.",
      "date.greater": "Last working day must be after the resignation date.",
    }),

  reason: Joi.string().min(1).required().messages({
    "any.required": "Reason is required.",
    "string.empty": "Reason cannot be empty.",
  }),
});

const ResignationUpdateValidator = Joi.object({
  resignationDate: Joi.date().iso().required().messages({
    "any.required": "Resignation date is required.",
    "date.base": "Resignation date must be a valid ISO date.",
  }),

  lastWorkingDay: Joi.date()
    .iso()
    .greater(Joi.ref("resignationDate"))
    .required()
    .messages({
      "any.required": "Last working day is required.",
      "date.base": "Last working day must be a valid ISO date.",
      "date.greater": "Last working day must be after the resignation date.",
    }),

  reason: Joi.string().min(1).required().messages({
    "any.required": "Reason is required.",
    "string.empty": "Reason cannot be empty.",
  }),
});

module.exports = { ResignationCreateValidator, ResignationUpdateValidator };
