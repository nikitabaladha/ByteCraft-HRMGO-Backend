const SystemSettings = require('../../../models/SystemSettings');

const updateSystemSettings = async (req, res) => {
  try {
    const {
      siteCurrency,
      siteCurrencySymbol,
      // siteDateFormat,
      // siteTimeFormat,
      employeePrefix,
    } = req.body;

    // Validate required fields (if any)
    if (!siteCurrency || !siteCurrencySymbol ||!employeePrefix) {
      return res.status(400).json({
        message: 'All fields are required.',
        requiredFields: ['siteCurrency', 'siteCurrencySymbol', 'siteDateFormat', 'siteTimeFormat', 'employeePrefix'],
      });
    }

    // Use findOneAndUpdate with upsert: true
    const updatedSettings = await SystemSettings.findOneAndUpdate(
      {}, // Empty filter to match any document
      {
        siteCurrency,
        siteCurrencySymbol,
        // siteDateFormat,
        // siteTimeFormat,
        employeePrefix,
      },
      {
        new: true, // Return the updated document
        upsert: true, // Create if it doesn't exist
        setDefaultsOnInsert: true, // Apply default values if creating
      }
    );

    return res.status(200).json({
      message: 'System settings updated successfully.',
      data: updatedSettings,
    });
  } catch (error) {
    console.error('Error updating system settings:', error);
    return res.status(500).json({
      message: 'Internal server error.',
      error: error.message, // Include error message for debugging
    });
  }
};

module.exports = updateSystemSettings;