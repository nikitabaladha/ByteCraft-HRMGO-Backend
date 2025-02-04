const mongoose = require("mongoose");


const AllowanceOptionSchema = new mongoose.Schema({
  allowanceName: {
    type: String,
    required: true,
    unique: true,
  },
},
{ timestamps: true }
);


const AllowanceOption = mongoose.model("AllowanceOption", AllowanceOptionSchema);
module.exports = AllowanceOption;
