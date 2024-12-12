const Joi = require("joi");

const MeetingValidator = Joi.object({
  title: Joi.string().required(),

  date: Joi.date().required(),

  time: Joi.string()
    .pattern(/^([1-9]|1[0-2]):[0-5][0-9] [APap][Mm]$/)
    .required(),
});

module.exports = MeetingValidator;
