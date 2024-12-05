const mongoose = require("mongoose");

const ContractSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
    },
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    contractTypeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ContractType",
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["Decline", "Accept", "Pending"],
      default: "Pending",
    },
    description: {
      type: String,
    },
    attachmentUrl: {
      type: [String],
    },
    comments: {
      type: [String],
    },
    notes: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

const Contract = mongoose.model("Contract", ContractSchema);
module.exports = Contract;
