const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const systemSettingsSchema = new Schema({
  siteCurrency: {
    type: String,
    required: true,
    default: 'Dollars',
  },
  siteCurrencySymbol: {
    type: String,
    required: true,
    default: '$',
  },
  siteDateFormat: {
    type: String,
    required: true,
    enum: [ 'd-m-Y', ],
    default: 'd-m-Y',
  },
  siteTimeFormat: {
    type: String,
    required: true,
    enum: ['g:i A',],
    default: 'g:i A',
  },
  employeePrefix: {
    type: String,
    required: true,
    default: '#EMP00',
  },
});

const SystemSettings = mongoose.model('SystemSettings', systemSettingsSchema);

module.exports = SystemSettings;
