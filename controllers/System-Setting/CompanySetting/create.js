const CompanySettings = require('../../../models/CompanySetting');

const createCompanySetting = async (req, res) => {
  try {
    const {
      company_name,
      company_address,
      company_city,
      company_state,
      company_zipcode,
      company_country,
      company_telephone,
      company_start_time,
      company_end_time,
      timezone,
    } = req.body;

    if (!company_name || !company_start_time || !company_end_time || !timezone) {
      return res.status(400).json({ message: 'Required fields are missing.' });
    }

    const newCompanySetting = new CompanySettings({
      company_name,
      company_address,
      company_city,
      company_state,
      company_zipcode,
      company_country,
      company_telephone,
      company_start_time,
      company_end_time,
      timezone,
    });

    const savedSetting = await newCompanySetting.save();

    res.status(201).json({
      message: 'Company settings created successfully.',
      data: savedSetting,
    });
  } catch (error) {
    console.error('Error creating company setting:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

module.exports = createCompanySetting;
