const BusinessSetting = require('../../../models/BusinessSetting');

// Controller for creating a new business setting
const createBusinessSetting = async (req, res) => {
  try {
    const { titleText, footerText, } = req.body;

    if (!req.files || !req.files.logoDark) {
      return res.status(400).json({
        hasError: true,
        message: "logoDark is required.",
      });
    }

    if (!req.files || !req.files.logoLight) {
      return res.status(400).json({
        hasError: true,
        message: "logoLight is required.",
      });
    }

    if (!req.files || !req.files.favicon) {
      return res.status(400).json({
        hasError: true,
        message: "favicon is required.",
      });
    }

    const logoDarkImagePath = "/Images/logoDark";
    const logoDark = `${logoDarkImagePath}/${req.files.logoDark[0].filename}`;

    const logoLightImagePath = "/Images/logoLight";
    const logoLight = `${logoLightImagePath}/${req.files.logoLight[0].filename}`;

    const faviconImagePath = "/Images/favicon";
    const favicon = `${faviconImagePath}/${req.files.favicon[0].filename}`;


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
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Error creating business setting',
      error: error.message,
    });
  }
};

module.exports =  createBusinessSetting ;
