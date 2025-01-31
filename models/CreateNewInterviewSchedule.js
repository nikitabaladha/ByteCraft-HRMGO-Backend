// models/InterviewSchedule.js
const mongoose = require('mongoose');

const InterviewScheduleSchema = new mongoose.Schema({
  applicantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "application",
    required: true,
  },
  candidate: {
    type: String,
    unique: true,
    required: true,
  },
  applicatAppliedFor: {
    type: String,
    required: true,
  },
  applicantEmail: {
    type: String,
    required: [true, "Email is required"],
    match: [
      /^\S+@\S+\.\S+$/,
      "Please provide a valid email address",
    ],
  },
  applicantPhone: {
    type: String,
    required: [true, "Phone number is required"],
    match: [
      /^\+\d{1,3}\d{9,13}$/,
      "Phone number must include country code (e.g., +91)",
    ],
  },
  applicantStatus: {
    type: String,
    enum: ["Applied", "Phone Screen", "Interview", "Hired", "Rejected"],
    default: "Applied",
  },
  applicantDOB: {
    type: Date,
  },
  applicantGender: {
    type: String,
    enum: ["Male", "Female"],
  },
  applicationCreatedAt: {
    type: Date,
    required: true,
  },
  applicantAddress: {
    type: String,
  },
  interviewer: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String, 
    required: true,
  },
  comment: {
    type: String,
    default: '',
  },
  synchronizeType: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

const InterviewSchedule = mongoose.model('InterviewSchedule', InterviewScheduleSchema);

module.exports = InterviewSchedule;
