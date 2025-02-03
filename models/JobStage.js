const mongoose = require("mongoose");

const JobStageSchema = new mongoose.Schema({
  stageName: {
    type: String,
    required: true,
    unique: true,
  },
},
{ timestamps: true }
);

const JobStage = mongoose.model("JobStage", JobStageSchema);
module.exports = JobStage;
