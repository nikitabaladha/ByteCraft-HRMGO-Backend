const mongoose = require('mongoose');

const OtherpaymentSchema = new mongoose.Schema(
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

const Otherpayment = mongoose.model('Otherpayment', OtherpaymentSchema);

module.exports = Otherpayment;
