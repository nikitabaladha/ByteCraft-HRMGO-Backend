// models/InterviewSchedule.js
const mongoose = require('mongoose');

const MessagesSchema = new mongoose.Schema({
  conversationId: {
    type: String,
  },
  senderId: {
    type: String,
  },
  message: {
    type: String
  },
});

const Messages = mongoose.model('Message', MessagesSchema);

module.exports = Messages;
