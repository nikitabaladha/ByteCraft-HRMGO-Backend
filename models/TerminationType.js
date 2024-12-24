const mongoose = require("mongoose");

const TerminationTypeSchema = new mongoose.Schema({
  terminationName: {
    type: String,
    required: true,
    unique: true,
  },
},
{ timestamps: true });

const TerminationType = mongoose.model("TerminationType", TerminationTypeSchema);
module.exports = TerminationType;
