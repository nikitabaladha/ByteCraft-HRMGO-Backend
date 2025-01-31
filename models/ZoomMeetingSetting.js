const mongoose = require('mongoose');

const zoomMeetingSettingsSchema = new mongoose.Schema({
  zoom_account_id: {
    type: String,
    required: true,
    trim: true
  },
  zoom_client_id: {
    type: String,
    required: true,
    trim: true
  },
  zoom_client_secret: {
    type: String,
    required: true,
    trim: true
  }
}, { timestamps: true }); 
const ZoomMeetingSettings = mongoose.model('ZoomMeetingSettings', zoomMeetingSettingsSchema);

module.exports = ZoomMeetingSettings;
