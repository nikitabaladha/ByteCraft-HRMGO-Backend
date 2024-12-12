const Joi = require("joi");

const EmployeeCreateValidator = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().required(),
  dateOfBirth: Joi.date().required(),
  gender: Joi.string().valid("Male", "Female").required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  address: Joi.string().required(),
  branchId: Joi.string().required(),
  departmentId: Joi.string().required(),
  designationId: Joi.string().required(),
  dateOfJoining: Joi.date().required(),
  accountHolderName: Joi.string().required(),
  accountNumber: Joi.string().required(),
  bankName: Joi.string().required(),
  bankIdentifierCode: Joi.string().required(),
  branchLocation: Joi.string().required(),
  taxPayerId: Joi.string().required(),
});

const EmployeeUpdateValidator = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().required(),
  dateOfBirth: Joi.date().required(),
  gender: Joi.string().valid("Male", "Female").required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  address: Joi.string().required(),
  branchId: Joi.string().required(),
  departmentId: Joi.string().required(),
  designationId: Joi.string().required(),
  dateOfJoining: Joi.date().required(),
  accountHolderName: Joi.string().required(),
  accountNumber: Joi.string().required(),
  bankName: Joi.string().required(),
  bankIdentifierCode: Joi.string().required(),
  branchLocation: Joi.string().required(),
  taxPayerId: Joi.string().required(),
});

module.exports = { EmployeeCreateValidator, EmployeeUpdateValidator };
