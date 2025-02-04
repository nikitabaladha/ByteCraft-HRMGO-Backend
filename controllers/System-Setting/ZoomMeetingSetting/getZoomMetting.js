const ZoomMeetingSettings = require('../../../models/ZoomMeetingSetting');

const getZoomSettings = async (req, res) => {
  try {
    const zoomSettings = await ZoomMeetingSettings.findOne();

    if (!zoomSettings) {
      return res.status(404).json({ message: 'Zoom settings not found' });
    }

    return res.status(200).json({
      message: 'Zoom settings fetched successfully',
      data: zoomSettings,
    });
  } catch (error) {
    console.error('Error fetching Zoom settings:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = getZoomSettings;
