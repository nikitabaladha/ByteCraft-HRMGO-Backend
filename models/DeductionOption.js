
const mongoose = require("mongoose");

const DeductionOptionSchema = new mongoose.Schema({
  deductionName: {
    type: String,
    required: true,
    unique: true,
  },
},
{ timestamps: true }
);

const DeductionOption = mongoose.model("DeductionOption", DeductionOptionSchema);
module.exports = DeductionOption;
