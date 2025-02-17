const mongoose = require("mongoose");

const ManageLeaveSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    leaveTypeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LeaveType",
      required: true,
    },
    appliedOn: { type: Date, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    totalDays: { type: Number, required: true },
    reason: { type: String, required: true },
    status: {
      type: String,
      enum: ["Approved", "Rejected", "Pending"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

ManageLeaveSchema.index(
  { employeeId: 1, startDate: 1, endDate: 1 },
  { unique: true }
);

const ManageLeave = mongoose.model("ManageLeave", ManageLeaveSchema);
module.exports = ManageLeave;
