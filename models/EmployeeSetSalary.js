const mongoose = require('mongoose');

const salarySchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
      required: true,
      unique: true,
    },
    salaryType: {
      type: String,
      enum: ['Monthly Payslip', 'Hourly Payslip'],
      required: true,
    },
    salary: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);
salarySchema.index({ employeeId: 1 }, { unique: true });

const Salary = mongoose.model('Salary', salarySchema);

module.exports = Salary;
