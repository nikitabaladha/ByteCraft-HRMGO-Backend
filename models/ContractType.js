const mongoose = require("mongoose");

const ContractTypeSchema = new mongoose.Schema({
  contractName: {
    type: String,
    required: true,
    unique: true,
  },
},
{ timestamps: true });

const ContractType = mongoose.model("ContractType", ContractTypeSchema);
module.exports = ContractType;
