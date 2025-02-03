const mongoose = require("mongoose");

const PerformanceTypeSchema = new mongoose.Schema({
  performanceName: {
    type: String,
    required: true,
    unique: true,
  },
},
{ timestamps: true }
);

const PerformanceType = mongoose.model("PerformanceType", PerformanceTypeSchema);
module.exports = PerformanceType;
