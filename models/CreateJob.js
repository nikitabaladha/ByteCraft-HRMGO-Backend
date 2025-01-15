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
    required: true, 
  },
  position: {
    type: Number, 
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
  description: {
    type: String,
    required: true,
  },
  requirement: {
    type: String,
    required: true, 
  },
  terms: {
    type: String,
  },
}, { timestamps: true });

const Job = mongoose.model('Job', JobSchema);

module.exports = Job;
