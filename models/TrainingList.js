const { string } = require('joi');
const mongoose = require('mongoose');

const trainingSchema = new mongoose.Schema({
  branch: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Started', 'Completed', 'Terminated'], // Define enum values
    required: true,
    default: 'Pending'
  },
  Performance: {
    type: String,
    enum: ['Not Concluded', 'Satisfactory', 'Average', 'Poor', 'Excellent'], // Define enum values
    // required: true,
    default: 'Not Concluded'
  },
  Remark: {
    type: String,
    maxlength: 500, // Optional: Limits the length of the description
  },
  trainerOption: {
    type: String,
    enum: ['Internal', 'External'], // Define enum values
    required: true,
  },
  trainingType: {
    type: String,
    enum: ['Job Training', 'Management Training'], 
    required: true,
  },
  trainer: {
    type: String,
    required: true,
  },
  trainingCost: {
    type: Number,
    required: true,
    min: 0, // Ensures no negative cost
  },
  employee: {
    type: String, // Reference to an Employee collection
    // ref: 'Employee',
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    maxlength: 500, // Optional: Limits the length of the description
  },
});

const Training = mongoose.model('Training', trainingSchema);

module.exports = Training;
