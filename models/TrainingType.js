const mongoose = require("mongoose");

const TrainingTypeSchema = new mongoose.Schema({
  trainingName: {
    type: String,
    required: true,
    unique: true,
  },
},
{ timestamps: true }
);

const TrainingType = mongoose.model("TrainingType", TrainingTypeSchema);
module.exports = TrainingType;
