const mongoose = require('mongoose');

const companySettingsSchema = new mongoose.Schema({
  company_name: {
    type: String,
    required: true,
    trim: true,
  },
  company_address: {
    type: String,
    trim: true,
  },
  company_city: {
    type: String,
    trim: true,
  },
  company_state: {
    type: String,
    trim: true,
  },
  company_zipcode: {
    type: String,
    trim: true,
  },
  company_country: {
    type: String,
    trim: true,
  },
  company_telephone: {
    type: String,
    trim: true,
    validate: {
      validator: (v) => /^\+(\d{1,3})\d{10,15}$/.test(v),
      message: (props) => `${props.value} is not a valid telephone number with country code!`,
    },
  },
  company_start_time: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: (v) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(v),
      message: (props) => `${props.value} is not a valid time format (HH:MM)!`,
    },
  },
  company_end_time: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: (v) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(v),
      message: (props) => `${props.value} is not a valid time format (HH:MM)!`,
    },
  },
  timezone: {
    type: String,
    required: true,
    trim: true,
  },
}, {
  timestamps: true, 
});

const CompanySettings = mongoose.model('CompanySettings', companySettingsSchema);

module.exports = CompanySettings;
