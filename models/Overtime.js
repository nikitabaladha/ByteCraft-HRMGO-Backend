const mongoose = require('mongoose');

const overtimeSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
      required: true,
    },
    employeeName: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    numberOfDays: {
      type: Number,
      required: true,
    },
    hours: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    // totalOvertimeAmount: {
    //   type: Number,
    //   required: true,
    // },
  },
  { timestamps: true }
);

const Overtime = mongoose.model('Overtime', overtimeSchema);

module.exports = Overtime;
