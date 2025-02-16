const mongoose = require("mongoose");

const ContractAttachmentSchema = new mongoose.Schema(
  {
    contractId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contract",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    contractAttachmentUrl: {
      type: String,
      required: true,
    },
    fileSize: { type: Number },
  },
  {
    timestamps: true,
  }
);

const ContractAttachment = mongoose.model(
  "ContractAttachment",
  ContractAttachmentSchema
);

module.exports = ContractAttachment;
