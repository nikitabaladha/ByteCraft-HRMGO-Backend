const mongoose = require('mongoose');


const TicketReplySchema = new mongoose.Schema({
  ticketId: {
    type: mongoose.Schema.Types.ObjectId,  
    ref: 'Ticket', 
    required: true, 
  },
  description: {
    type: String,
    required: true,  
  },
  attachment: {
    type: String,  
    default: null,  
  },
  createdAt: {
    type: Date,
    default: Date.now,  
  },
  updatedAt: {
    type: Date,
    default: Date.now,  
  },
});


TicketReplySchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});


const TicketReply = mongoose.model('TicketReply', TicketReplySchema);


module.exports = TicketReply;
