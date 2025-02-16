const mongoose = require("mongoose");

const TerminationSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    terminationTypeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TerminationType",
      required: true,
    },
    noticeDate: { type: Date, required: true },
    terminationDate: { type: Date, required: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

TerminationSchema.index(
  { employeeId: 1, terminationDate: 1 },
  { unique: true }
);

const Termination = mongoose.model("Termination", TerminationSchema);
module.exports = Termination;
