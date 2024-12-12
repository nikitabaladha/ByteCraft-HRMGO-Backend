const Joi = require("joi");

const AnnouncementValidator = Joi.object({
  title: Joi.string().required(),

  startDate: Joi.date().required(),

  endDate: Joi.date().required(),

  description: Joi.string().required(),
});

module.exports = AnnouncementValidator;
