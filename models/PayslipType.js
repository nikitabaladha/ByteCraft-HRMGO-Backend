const mongoose = require("mongoose");


const PayslipTypeSchema = new mongoose.Schema({
  payslipType: {
    type: String,
    required: true,
    unique: true,
  },
},
{ timestamps: true }
);


const PayslipType = mongoose.model("PayslipType", PayslipTypeSchema);
module.exports = PayslipType;
