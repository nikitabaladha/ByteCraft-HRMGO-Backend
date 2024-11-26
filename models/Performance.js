const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create a schema for performance with Date type for times
const PerformanceSchema = new Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    overAllRating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
      set: (v) => Math.round(v * 100) / 100,
    },
    targetRating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
      set: (v) => Math.round(v * 100) / 100,
    },
    addedById: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    createdAt: {
      type: Date,
      required: true,
    },
    appraisalDate: {
      type: Date,
      required: true,
    },
    remark: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

PerformanceSchema.index({ employeeId: 1, appraisalDate: 1 }, { unique: true });

// Create a model for performance
const Performance = mongoose.model("Performance", PerformanceSchema);

module.exports = Performance;
