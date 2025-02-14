const mongoose = require('mongoose');
const mongooseSequence = require("mongoose-sequence")(mongoose);


const ticketSchema = new mongoose.Schema({
  ticket_code: {
    type: Number,
    unique: true, 
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  employee_name: {
    type: String,
    required: true,
    trim: true,
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  attachment: {
    type: String, 
  },
  status: {
    type: String,
    enum: ['open', 'close', 'onhold'],
    default: 'close',
  },
  created_by: {
    type: String,
    enum: ['HRM', 'Manager', 'Admin'],
    default: 'HRM',
  },
  end_date: {
    type: Date,
    default: Date.now,
  },
  created_date: {
    type: Date,
    default: Date.now, 
  },
  updated_date: {
    type: Date,
    default: Date.now, 
  }
});


ticketSchema.plugin(mongooseSequence, {
    inc_field: 'ticket_code', 
    start_seq: 803,            
    step: 1,                   
    min: 803,                  
    max: 9999,               
    formatter: function(seq) { 
      return String(seq).padStart(4, '0');  
    }
  });


const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
