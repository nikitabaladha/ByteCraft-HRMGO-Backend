const mongoose = require("mongoose");

const PaymentTypeSchema = new mongoose.Schema({
  paymentName: {
    type: String,
    required: true,
    unique: true,
  },
},
{ timestamps: true });

const PaymentType = mongoose.model("PaymentType", PaymentTypeSchema);
module.exports = PaymentType;
