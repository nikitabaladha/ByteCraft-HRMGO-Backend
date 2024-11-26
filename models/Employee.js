// // HRMGO-Backend\models\Employee.js
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
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Branch",
//       required: true,
//     },
//     departmentId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Department",
//       required: true,
//     },
//     designation: {
//       type: String,
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

// HRMGO-Backend\models\Employee.js
const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    branchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
    },
    departmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },
    designationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Designation",
      required: true,
    },
    joiningDate: {
      type: Date,
      required: true,
    },
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
