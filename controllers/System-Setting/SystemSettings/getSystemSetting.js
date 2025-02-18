const SystemSettings = require("../../../models/SystemSettings");

const getSystemSettings = async (req, res) => {
  try {
    const settings = await SystemSettings.findOne();

    if (!settings) {
      return res.status(404).json({
        message: "System settings not found.",
      });
    }

    return res.status(200).json({
      message: "System settings retrieved successfully",
      data: settings,
    });
  } catch (error) {
    console.error("Error retrieving system settings:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = getSystemSettings;
