const mongoose = require('mongoose');

const EmailTemplateEmployeePromotionSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  mail_from_name: {
    type: String,
    // required: true,
  },
});

module.exports = mongoose.model('EmailTemplateEmployeePromotion', EmailTemplateEmployeePromotionSchema);