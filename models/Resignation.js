const mongoose = require("mongoose");

const ResignationSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    resignationDate: {
      type: Date,
      required: true,
    },
    lastWorkingDay: {
      type: Date,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

ResignationSchema.index(
  { employeeId: 1, resignationDate: 1 },
  { unique: true }
);

const Resignation = mongoose.model("Resignation", ResignationSchema);
module.exports = Resignation;
