const { required } = require('joi');
const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true, // Add category IDs from the select options
  },
  position: {
    type: Number, // Assuming it's a numeric field for the number of positions
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['active', 'in_active'],
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  skill: {
    type: [String],
    required: true,
  },
  applicant: {
    type: [String],
    enum: ['Gender', 'Date of Birth', 'Address'], 
    required: true, 
  },  
  visibility: 
    {
        type: [String],
      enum: ['Profile', 'Resume', 'Letter', 'Terms and Conditions'], 
    },
  customQuestions: 
    {
    type: [String],
      enum: ['What Do You Know About This Job?', 'Why do you want this job?', 'Why do you want to work this company?']
    },
  description: {
    type: String,
    required: true, // Optional: Limits the length of the description
  },
  requirement: {
    type: String,
    required: true, // Optional: Limits the length of the description
  },
  terms: {
    type: String, // Optional: Limits the length of the description
  },
}, { timestamps: true });

const Job = mongoose.model('Job', JobSchema);

module.exports = Job;
