const SystemSettings = require("../../../models/SystemSettings");

const updateSystemSettings = async (req, res) => {
  try {
    const {
      siteCurrency,
      siteCurrencySymbol,
      siteDateFormat,
      siteTimeFormat,
      employeePrefix,
    } = req.body;

    let existingSettings = await SystemSettings.findOne();

    if (!existingSettings) {
      return res.status(404).json({
        message: "System settings not found. Please create settings first.",
      });
    }

    existingSettings.siteCurrency =
      siteCurrency || existingSettings.siteCurrency;
    existingSettings.siteCurrencySymbol =
      siteCurrencySymbol || existingSettings.siteCurrencySymbol;
    existingSettings.siteDateFormat =
      siteDateFormat || existingSettings.siteDateFormat;
    existingSettings.siteTimeFormat =
      siteTimeFormat || existingSettings.siteTimeFormat;
    existingSettings.employeePrefix =
      employeePrefix || existingSettings.employeePrefix;

    const updatedSettings = await existingSettings.save();

    return res.status(200).json({
      message: "System settings updated successfully",
      data: updatedSettings,
    });
  } catch (error) {
    console.error("Error updating system settings:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = updateSystemSettings;
