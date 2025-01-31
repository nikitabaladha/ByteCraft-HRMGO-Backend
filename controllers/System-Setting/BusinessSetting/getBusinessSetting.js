const BusinessSetting = require('../../../models/BusinessSetting');

const getBusinessSetting = async (req, res) => {
  try {
    const businessSetting = await BusinessSetting.findOne();

    if (!businessSetting) {
      return res.status(404).json({
        message: 'Business setting not found',
      });
    }

    return res.status(200).json({
      message: 'Business setting retrieved successfully',
      data: businessSetting,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Error retrieving business setting',
      error: error.message,
    });
  }
};
module.exports = getBusinessSetting;
