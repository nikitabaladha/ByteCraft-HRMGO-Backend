const BusinessSetting = require('../../../models/BusinessSetting');

// Controller for updating a business setting
const updateBusinessSetting = async (req, res) => {
  try {
    const { titleText, footerText } = req.body;

    const existingSetting = await BusinessSetting.findOne();

    if (req.files) {
      if (req.files.logoDark) {
        existingSetting.logoDark = `/Images/logoDark/${req.files.logoDark[0].filename}`;
      }
      if (req.files.logoLight) {
        existingSetting.logoLight = `/Images/logoLight/${req.files.logoLight[0].filename}`;
      }
      if (req.files.favicon) {
        existingSetting.favicon = `/Images/favicon/${req.files.favicon[0].filename}`;

    }
  }

    if (existingSetting) {
      existingSetting.titleText = titleText || existingSetting.titleText;
      existingSetting.footerText = footerText || existingSetting.footerText;

      await existingSetting.save();

      return res.status(200).json({
        message: 'Business setting updated successfully',
        data: existingSetting,
      });
    } else {
      const newBusinessSetting = new BusinessSetting({
        titleText,
        footerText,
        logoDark,
        logoLight,
        favicon,
      });

      await newBusinessSetting.save();

      return res.status(201).json({
        message: 'Business setting created successfully',
        data: newBusinessSetting,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Error updating business setting',
      error: error.message,
    });
  }
};

module.exports = updateBusinessSetting;
