const Joi = require("joi");

const HolidayCreateValidator = Joi.object({
  occasion: Joi.string().required().messages({
    "any.required": "Holiday occasion is required.",
  }),
  startDate: Joi.date().iso().required().messages({
    "any.required": "Holiday start date is required.",
    "date.base": "Date must be a valid ISO date.",
  }),
  endDate: Joi.date().iso().min(Joi.ref("startDate")).required().messages({
    "any.required": "End Date is required.",
    "date.base": "End Date must be a valid ISO date.",
    "date.min": "End Date must be the same as or after the Start Date.",
  }),
});

const HolidayUpdateValidator = Joi.object({
  occasion: Joi.string().required().messages({
    "any.required": "Holiday occasion is required.",
  }),
  startDate: Joi.date().iso().required().messages({
    "any.required": "Holiday start date is required.",
    "date.base": "Date must be a valid ISO date.",
  }),
  endDate: Joi.date().iso().min(Joi.ref("startDate")).required().messages({
    "any.required": "End Date is required.",
    "date.base": "End Date must be a valid ISO date.",
    "date.min": "End Date must be the same as or after the Start Date.",
  }),
});

module.exports = { HolidayCreateValidator, HolidayUpdateValidator };
