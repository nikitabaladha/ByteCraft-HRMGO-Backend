const mongoose = require('mongoose');

const taxSchema = new mongoose.Schema(
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
    taxes: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['Fixed', 'Percentage'],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Tax = mongoose.model('Tax', taxSchema);

module.exports = Tax;
