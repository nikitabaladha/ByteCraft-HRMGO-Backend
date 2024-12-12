// const mongoose = require("mongoose");

// const EmployeeSchema = new mongoose.Schema(
//   {
//     id: {
//       type: String,
//       unique: true,
//     },
//     name: {
//       type: String,
//       required: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     branchId: {
// type: mongoose.Schema.Types.ObjectId,
// ref: "Branch",
// required: true,
//     },
//     departmentId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Department",
//       required: true,
//     },
//     designationId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Designation",
//       required: true,
//     },
//     joiningDate: {
//       type: Date,
//       required: true,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// EmployeeSchema.index(
//   { name: 1, branchId: 1, departmentId: 1 },
//   { unique: true }
// );

// const Employee = mongoose.model("Employee", EmployeeSchema);
// module.exports = Employee;

// const mongoose = require("mongoose");

// const EmployeeSchema = new mongoose.Schema(
//   {
//     id: { type: String, required: true, unique: true },
//     name: { type: String, required: true },
//     phone: { type: String, required: true },
//     dateOfBirth: { type: Date, required: true },
//     gender: { type: String, enum: ["Male", "Female"], required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     address: { type: String, required: true },

//     branchId: {
//       type: mongoose.Schema.Types.ObjectId,
//       required: true,
//       ref: "Branch",
//     },
//     departmentId: {
//       type: mongoose.Schema.Types.ObjectId,
//       required: true,
//       ref: "Department",
//     },
//     designationId: {
//       type: mongoose.Schema.Types.ObjectId,
//       required: true,
//       ref: "Designation",
//     },
//     dateOfJoining: { type: Date, required: true },
//     employeeCertificateUrl: { type: String, required: true },
//     employeeResumeUrl: { type: String, required: true },
//     employeePhotoUrl: { type: String, required: true },
//     accountHolderName: { type: String, required: true },
//     accountNumber: { type: String, required: true },
//     bankName: { type: String, required: true },
//     bankIdentifierCode: { type: String, required: true },
//     branchLocation: { type: String, required: true },
//     taxPayerId: { type: String, required: true },
//   },
//   {
//     timestamps: true,
//   }
// );

// EmployeeSchema.index(
//   { name: 1, branchId: 1, departmentId: 1 },
//   { unique: true }
// );

// const Employee = mongoose.model("Employee", EmployeeSchema);
// module.exports = Employee;

const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, enum: ["Male", "Female"], required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String, required: true },

    branchId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Branch",
    },
    departmentId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Department",
    },
    designationId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Designation",
    },
    dateOfJoining: { type: Date, required: true },
    employeePhotoUrl: { type: String, required: true },
    accountHolderName: { type: String, required: true },
    accountNumber: { type: String, required: true },
    bankName: { type: String, required: true },
    bankIdentifierCode: { type: String, required: true },
    branchLocation: { type: String, required: true },
    taxPayerId: { type: String, required: true },
    employeeCertificateUrl: { type: String, required: true },
    employeeResumeUrl: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

EmployeeSchema.index(
  { name: 1, branchId: 1, departmentId: 1 },
  { unique: true }
);

const Employee = mongoose.model("Employee", EmployeeSchema);
module.exports = Employee;
