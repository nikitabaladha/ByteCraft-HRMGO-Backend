const mongoose = require("mongoose");

const ContractTypeSchema = new mongoose.Schema(
  {
    contractName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

ContractTypeSchema.index({ contractName: 1 }, { unique: true });

const ContractType = mongoose.model("ContractType", ContractTypeSchema);
module.exports = ContractType;
