const Joi = require("joi");

const EmployeeCreateValidator = Joi.object({
  name: Joi.string().required().messages({
    "string.base": "Name must be a string.",
    "string.empty": "Name cannot be empty.",
    "any.required": "Name is required.",
  }),

  phone: Joi.string().required().messages({
    "string.base": "Phone must be a string.",
    "string.empty": "Phone cannot be empty.",
    "any.required": "Phone is required.",
  }),

  dateOfBirth: Joi.date().required().messages({
    "date.base": "Date of Birth must be a valid date.",
    "any.required": "Date of Birth is required.",
  }),

  gender: Joi.string().valid("Male", "Female").required().messages({
    "string.base": "Gender must be a string.",
    "any.only": 'Gender must be either "Male" or "Female".',
    "any.required": "Gender is required.",
  }),

  email: Joi.string().email().required().messages({
    "string.base": "Email must be a string.",
    "string.empty": "Email cannot be empty.",
    "string.email": "Email must be a valid email address.",
    "any.required": "Email is required.",
  }),

  password: Joi.string().required().messages({
    "string.base": "Password must be a string.",
    "string.empty": "Password cannot be empty.",
    "any.required": "Password is required.",
  }),

  address: Joi.string().required().messages({
    "string.base": "Address must be a string.",
    "string.empty": "Address cannot be empty.",
    "any.required": "Address is required.",
  }),

  branchId: Joi.string().required().messages({
    "string.base": "Branch ID must be a string.",
    "string.empty": "Branch ID cannot be empty.",
    "any.required": "Branch ID is required.",
  }),

  departmentId: Joi.string().required().messages({
    "string.base": "Department ID must be a string.",
    "string.empty": "Department ID cannot be empty.",
    "any.required": "Department ID is required.",
  }),

  designationId: Joi.string().required().messages({
    "string.base": "Designation ID must be a string.",
    "string.empty": "Designation ID cannot be empty.",
    "any.required": "Designation ID is required.",
  }),

  dateOfJoining: Joi.date().required().messages({
    "date.base": "Date of Joining must be a valid date.",
    "any.required": "Date of Joining is required.",
  }),

  accountHolderName: Joi.string().required().messages({
    "string.base": "Account Holder Name must be a string.",
    "string.empty": "Account Holder Name cannot be empty.",
    "any.required": "Account Holder Name is required.",
  }),

  accountNumber: Joi.string().required().messages({
    "string.base": "Account Number must be a string.",
    "string.empty": "Account Number cannot be empty.",
    "any.required": "Account Number is required.",
  }),

  bankName: Joi.string().required().messages({
    "string.base": "Bank Name must be a string.",
    "string.empty": "Bank Name cannot be empty.",
    "any.required": "Bank Name is required.",
  }),

  bankIdentifierCode: Joi.string().required().messages({
    "string.base": "Bank Identifier Code must be a string.",
    "string.empty": "Bank Identifier Code cannot be empty.",
    "any.required": "Bank Identifier Code is required.",
  }),

  branchLocation: Joi.string().required().messages({
    "string.base": "Branch Location must be a string.",
    "string.empty": "Branch Location cannot be empty.",
    "any.required": "Branch Location is required.",
  }),

  taxPayerId: Joi.string().required().messages({
    "string.base": "Tax Payer ID must be a string.",
    "string.empty": "Tax Payer ID cannot be empty.",
    "any.required": "Tax Payer ID is required.",
  }),
});

const EmployeeUpdateValidator = Joi.object({
  name: Joi.string().required().messages({
    "string.base": "Name must be a string.",
    "string.empty": "Name cannot be empty.",
    "any.required": "Name is required.",
  }),

  phone: Joi.string().required().messages({
    "string.base": "Phone must be a string.",
    "string.empty": "Phone cannot be empty.",
    "any.required": "Phone is required.",
  }),

  dateOfBirth: Joi.date().required().messages({
    "date.base": "Date of Birth must be a valid date.",
    "any.required": "Date of Birth is required.",
  }),

  gender: Joi.string().valid("Male", "Female").required().messages({
    "string.base": "Gender must be a string.",
    "any.only": 'Gender must be either "Male" or "Female".',
    "any.required": "Gender is required.",
  }),

  email: Joi.string().email().required().messages({
    "string.base": "Email must be a string.",
    "string.empty": "Email cannot be empty.",
    "string.email": "Email must be a valid email address.",
    "any.required": "Email is required.",
  }),

  password: Joi.string().required().messages({
    "string.base": "Password must be a string.",
    "string.empty": "Password cannot be empty.",
    "any.required": "Password is required.",
  }),

  address: Joi.string().required().messages({
    "string.base": "Address must be a string.",
    "string.empty": "Address cannot be empty.",
    "any.required": "Address is required.",
  }),

  branchId: Joi.string().required().messages({
    "string.base": "Branch ID must be a string.",
    "string.empty": "Branch ID cannot be empty.",
    "any.required": "Branch ID is required.",
  }),

  departmentId: Joi.string().required().messages({
    "string.base": "Department ID must be a string.",
    "string.empty": "Department ID cannot be empty.",
    "any.required": "Department ID is required.",
  }),

  designationId: Joi.string().required().messages({
    "string.base": "Designation ID must be a string.",
    "string.empty": "Designation ID cannot be empty.",
    "any.required": "Designation ID is required.",
  }),

  dateOfJoining: Joi.date().required().messages({
    "date.base": "Date of Joining must be a valid date.",
    "any.required": "Date of Joining is required.",
  }),

  accountHolderName: Joi.string().required().messages({
    "string.base": "Account Holder Name must be a string.",
    "string.empty": "Account Holder Name cannot be empty.",
    "any.required": "Account Holder Name is required.",
  }),

  accountNumber: Joi.string().required().messages({
    "string.base": "Account Number must be a string.",
    "string.empty": "Account Number cannot be empty.",
    "any.required": "Account Number is required.",
  }),

  bankName: Joi.string().required().messages({
    "string.base": "Bank Name must be a string.",
    "string.empty": "Bank Name cannot be empty.",
    "any.required": "Bank Name is required.",
  }),

  bankIdentifierCode: Joi.string().required().messages({
    "string.base": "Bank Identifier Code must be a string.",
    "string.empty": "Bank Identifier Code cannot be empty.",
    "any.required": "Bank Identifier Code is required.",
  }),

  branchLocation: Joi.string().required().messages({
    "string.base": "Branch Location must be a string.",
    "string.empty": "Branch Location cannot be empty.",
    "any.required": "Branch Location is required.",
  }),

  taxPayerId: Joi.string().required().messages({
    "string.base": "Tax Payer ID must be a string.",
    "string.empty": "Tax Payer ID cannot be empty.",
    "any.required": "Tax Payer ID is required.",
  }),
});

module.exports = { EmployeeCreateValidator, EmployeeUpdateValidator };
