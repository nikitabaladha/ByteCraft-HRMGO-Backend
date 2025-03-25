const EmailNotificationSetting = require('../../../models/EmailNotificationSetting');

const getSettings = async (req, res) => {
  try {
    const settings = await EmailNotificationSetting.findOne({});

    if (!settings) {
      return res.status(404).json({
        success: false,
        message: 'No settings found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Settings retrieved successfully',
      data: settings,
    });
  } catch (error) {
    console.error('Error retrieving settings:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve settings',
      error: error.message,
    });
  }
};

module.exports = getSettings