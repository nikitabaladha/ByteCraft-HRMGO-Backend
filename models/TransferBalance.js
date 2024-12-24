const mongoose = require('mongoose');


const transferBalanceSchema = new mongoose.Schema({
  fromAccountId: {
    type: String, 
    required: true,
  },
  toAccountId: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now, 
  },
  amount: {
    type: Number,
    required: true,
  },
  paymentTypeId: {
    type: String,
    required: true,
    enum: ['Cash', 'Bank'], 
  },
  referalId: {
    type: Number,
    unique: true, 
    required: [true, 'Referral ID is required'],
    min: [0, 'Referral ID cannot be negative'], 
  },
  description: {
    type: String,
    default: '', 
  },
});


const TransferBalance = mongoose.model('TransferBalance', transferBalanceSchema);


module.exports = TransferBalance;
