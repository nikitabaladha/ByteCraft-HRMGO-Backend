const mongoose = require('mongoose');


const depositSchema = new mongoose.Schema(
  {
  
    account_name: {
      type: String,
      required: [true, 'Account name is required'],
      trim: true, 
      maxlength: [100, 'Account name cannot exceed 100 characters'],
    },

    amount: {
      type: Number,
      required: [true, 'Amount is required'],
      min: [0, 'Amount cannot be negative'],
    },

 
    date: {
      type: Date,
      required: [true, 'Date is required'],
      default: Date.now, 
    },


    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
      maxlength: [50, 'Category cannot exceed 50 characters'],
    },

 
    payer_name: {
      type: String,
      required: [true, 'Payer name is required'],
      trim: true,
      maxlength: [100, 'Payer name cannot exceed 100 characters'],
    },

    
    payment_type: {
      type: String,
      required: [true, 'Payment type is required'],
      trim: true,
      maxlength: [30, 'Payment type cannot exceed 30 characters'], 
    },

     
    ref: {
      type: Number,
      unique: true, 
      required: [true, 'Referral ID is required'],
      min: [0, 'Referral ID cannot be negative'], 
    },


    description: {
      type: String,
      trim: true,
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
      default: '',
    },
  },
  {
    timestamps: true,
  }
);


const Deposit = mongoose.model('Deposit', depositSchema);

module.exports = Deposit;
