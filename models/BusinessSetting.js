const mongoose = require('mongoose');

// Create a schema for the business settings
const businessSettingSchema = new mongoose.Schema({
  titleText: {
    type: String,
    required: true,
    default: 'HRMGo',
  },
  footerText: {
    type: String,
    required: true,
    default: '2024 HRMGo',
  },
  logoDark: {
    type: String, // URL to the dark logo image
  },
  logoLight: {
    type: String, // URL to the light logo image
  },
  favicon: {
    type: String, // URL to the favicon image
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

const BusinessSetting = mongoose.model('BusinessSetting', businessSettingSchema);

module.exports = BusinessSetting;
