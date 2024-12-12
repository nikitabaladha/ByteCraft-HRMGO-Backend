// const Joi = require("joi");

// const EmployeeValidator = Joi.object({
//   name: Joi.string().min(3).max(50).required(),

//   email: Joi.string().email().required(),

//   branchId: Joi.string().required(),

//   departmentId: Joi.string().required(),

//   designationId: Joi.string().required(),

//   joiningDate: Joi.date().required(),
// });

// module.exports = EmployeeValidator;

// const Joi = require("joi");

// const EmployeeCreateValidator = Joi.object({
//   id: Joi.string().required(),
//   name: Joi.string().required(),
//   phone: Joi.string().required(),
//   dateOfBirth: Joi.date().required(),
//   gender: Joi.string().valid("Male", "Female").required(),
//   email: Joi.string().email().required(),
//   password: Joi.string().required(),
//   address: Joi.string().required(),
//   branchId: Joi.string().required(),
//   departmentId: Joi.string().required(),
//   designationId: Joi.string().required(),
//   dateOfJoining: Joi.date().required(),
//   employeeCertificateUrl: Joi.string().uri().required(),
//   employeeResumeUrl: Joi.string().uri().required(),
//   employeePhotoUrl: Joi.string().uri().required(),
//   accountHolderName: Joi.string().required(),
//   accountNumber: Joi.string().required(),
//   bankName: Joi.string().required(),
//   bankIdentifierCode: Joi.string().required(),
//   branchLocation: Joi.string().required(),
//   taxPayerId: Joi.string().required(),
// });

// module.exports = { EmployeeCreateValidator };

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

module.exports = { EmployeeCreateValidator };
