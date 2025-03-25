const mongoose = require('mongoose');

const emailNotificationSettingSchema = new mongoose.Schema({
  newUser: { type: Boolean, default: false },
  newEmployee: { type: Boolean, default: false },
  newPayroll: { type: Boolean, default: false },
  newTicket: { type: Boolean, default: false },
  newAward: { type: Boolean, default: false },
  employeeTransfer: { type: Boolean, default: false },
  employeeResignation: { type: Boolean, default: false },
  employeeTrip: { type: Boolean, default: false },
  employeePromotion: { type: Boolean, default: false },
  employeeComplaints: { type: Boolean, default: false },
  employeeWarning: { type: Boolean, default: false },
  employeeTermination: { type: Boolean, default: false },
  leaveStatus: { type: Boolean, default: false },
  contract: { type: Boolean, default: false },
}, { timestamps: true });

const EmailNotificationSetting = mongoose.model('EmailNotificationSetting', emailNotificationSettingSchema);

module.exports = EmailNotificationSetting;