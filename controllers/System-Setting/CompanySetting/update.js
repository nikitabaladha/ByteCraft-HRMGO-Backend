const CompanySettings = require('../../../models/CompanySetting');

const updateCompanySetting = async (req, res) => {
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

    if (!company_name && !company_start_time && !company_end_time && !timezone) {
      return res.status(400).json({ message: 'Required fields are missing.' });
    }

    const existingSetting = await CompanySettings.findOne();
    if (!existingSetting) {
      return res.status(404).json({ message: 'Company setting not found. Please create it first.' });
    }

    Object.assign(existingSetting, {
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

    const updatedSetting = await existingSetting.save();

    res.status(200).json({
      message: 'Company settings updated successfully.',
      data: updatedSetting,
    });
  } catch (error) {
    console.error('Error updating company setting:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

module.exports = updateCompanySetting;
