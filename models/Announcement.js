const Joi = require("joi");

const AnnouncementCreateValidator = Joi.object({
  employeeId: Joi.alternatives()
    .try(
      Joi.string().required(),
      Joi.array().items(Joi.string().required()).min(1)
    )
    .required()
    .messages({
      "any.required": "Employee is required.",
      "array.min": "At least one Employee must be provided.",
      "string.empty": "Employee  cannot be empty.",
    }),
  branchId: Joi.string().required().messages({
    "any.required": "Branch is required.",
    "string.empty": "Branch cannot be empty.",
  }),
  departmentId: Joi.string().required().messages({
    "any.required": "Department is required.",
    "string.empty": "Department cannot be empty.",
  }),
  title: Joi.string().required().messages({
    "any.required": "Announcement title is required.",
    "string.empty": "Title cannot be empty.",
  }),
  startDate: Joi.date().iso().required().messages({
    "any.required": "Announcement start date is required.",
    "date.base": "Date must be a valid ISO date.",
  }),
  endDate: Joi.date().iso().required().messages({
    "any.required": "Announcement end date is required.",
    "date.base": "Date must be a valid ISO date.",
  }),
  description: Joi.string().min(1).required().messages({
    "any.required": "Description is required.",
    "string.empty": "Description cannot be empty.",
  }),
});

const AnnouncementUpdateValidator = Joi.object({
  employeeId: Joi.alternatives()
    .try(Joi.string().required(), Joi.array().items(Joi.string()).min(1))
    .messages({
      "any.required": "Employee is required.",
      "array.min": "At least one Employee must be provided.",
      "string.empty": "Employee  cannot be empty.",
    }),
  branchId: Joi.string().required().messages({
    "any.required": "Branch is required.",
    "string.empty": " Branch cannot be empty.",
  }),
  departmentId: Joi.string().required().messages({
    "any.required": "Department is required.",
    "string.empty": "Department cannot be empty.",
  }),
  title: Joi.string().required().messages({
    "any.required": "Announcement title is required.",
  }),
  startDate: Joi.date().iso().required().messages({
    "any.required": "Announcement start date is required.",
    "date.base": "Date must be a valid ISO date.",
  }),
  endDate: Joi.date().iso().required().messages({
    "any.required": "Announcement end date is required.",
    "date.base": "Date must be a valid ISO date.",
  }),
  description: Joi.string().min(1).required().messages({
    "any.required": "Description is required.",
    "string.empty": "Description cannot be empty.",
  }),
});

module.exports = { AnnouncementCreateValidator, AnnouncementUpdateValidator };
