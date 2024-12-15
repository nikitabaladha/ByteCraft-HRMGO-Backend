const mongoose = require('mongoose');

// Employee Model Reference (assuming this model is already created)
const Employee = require('./Employee');

// Define the SetPayroll schema
const PayrollSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee', 
    required: true
  },
  payrollType: {
    type: String,
    required: true
  },
  salary: {
    type: Number,  
    required: true
  },
  netSalary: {
    type: Number,  
    required: true
  },
  status: {
    type: String,  
    required: true,
    default: 'unpaid',  
    enum:["paid","unpaid","inactive"],
  },
  paydate: {
    type: Date,  // The date when the payroll is processed
    required: true
  },
  month: {
    type: Number,  // Store month as a number (1-12)
    required: true
  },
  year: {
    type: Number,  // Store year as a number (e.g., 2024)
    required: true
  },
}, { timestamps: true });

// Create index for faster queries on month and year
PayrollSchema.index({ year: 1, month: 1, employeeId: 1 }, { unique: true });

const Payroll = mongoose.model('Payroll', PayrollSchema);

module.exports = Payroll;
