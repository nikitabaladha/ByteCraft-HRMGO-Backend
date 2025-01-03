const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema(
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
    loanOption: {
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
    reason: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Loan = mongoose.model('Loan', loanSchema);

module.exports = Loan;
