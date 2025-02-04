const mongoose = require("mongoose");

const LeaveTypeSchema = new mongoose.Schema({

  leaveTypeName: 
  { 
    type: String, 
    required: true,
     unique: true
     },

  daysPerYear:
   { 
    type: Number,
     required: true 
    }
},
{ timestamps: true }
);

const LeaveType = mongoose.model("LeaveType", LeaveTypeSchema);

module.exports = LeaveType;
