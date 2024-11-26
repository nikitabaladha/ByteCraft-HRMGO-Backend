const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MarkedAttendanceSchema = new Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["Present", "Absent"],
      required: true,
    },
    clockIn: {
      type: Date,
      required: true,
    },
    clockOut: {
      type: Date,
      required: true,
    },
    late: {
      type: String,
    },
    earlyLeaving: {
      type: String,
    },
    overtime: {
      type: String,
    },
    hrs: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

MarkedAttendanceSchema.index({ employeeId: 1, date: 1 }, { unique: true });

// Create a model for attendance
const MarkedAttendance = mongoose.model(
  "MarkedAttendance",
  MarkedAttendanceSchema
);

module.exports = MarkedAttendance;
