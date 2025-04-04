
const mongoose = require('mongoose');

const MessagesSchema = new mongoose.Schema({
  conversationId: {
    type: String,
  },
  senderId: {
    type: String,
  },
  receiverId: {
    type: String,
  },
  message: {
    type: String
  },
  messageFile: {
    type: String,
  },
  isRead: {
    type: Boolean,
    default: false
  }
},
  { timestamps: true }
);

const Messages = mongoose.model('Message', MessagesSchema);

module.exports = Messages;