const SystemSettings = require("../../../models/SystemSettings");

const createSystemSettings = async (req, res) => {
  try {
    const {
      siteCurrency,
      siteCurrencySymbol,
      siteDateFormat,
      siteTimeFormat,
      employeePrefix,
    } = req.body;

    const newSettings = new SystemSettings({
      siteCurrency,
      siteCurrencySymbol,
      siteDateFormat,
      siteTimeFormat,
      employeePrefix,
    });

    const savedSettings = await newSettings.save();

    return res.status(201).json({
      message: "System settings created successfully",
      data: savedSettings,
    });
  } catch (error) {
    console.error("Error creating system settings:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = createSystemSettings;
