const CompanySettings = require('../../../models/CompanySetting');

const getCompanySetting = async (req, res) => {
  try {
    const companySetting = await CompanySettings.findOne();

    if (!companySetting) {
      return res.status(404).json({ message: 'Company settings not found.' });
    }

    res.status(200).json({
      message: 'Company settings retrieved successfully.',
      data: companySetting,
    });
  } catch (error) {
    console.error('Error retrieving company settings:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

module.exports = getCompanySetting;
