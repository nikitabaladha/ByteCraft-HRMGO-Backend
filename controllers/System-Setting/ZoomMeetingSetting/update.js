const ZoomMeetingSettings = require('../../../models/ZoomMeetingSetting');

const updateZoomSettings = async (req, res) => {
  try {
    const { zoom_account_id, zoom_client_id, zoom_client_secret } = req.body;

    if (!zoom_account_id || !zoom_client_id || !zoom_client_secret) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingZoomSettings = await ZoomMeetingSettings.findOne();

    if (!existingZoomSettings) {
      return res.status(404).json({ message: 'Zoom settings not found' });
    }

    existingZoomSettings.zoom_account_id = zoom_account_id;
    existingZoomSettings.zoom_client_id = zoom_client_id;
    existingZoomSettings.zoom_client_secret = zoom_client_secret;

    await existingZoomSettings.save();

    return res.status(200).json({
      message: 'Zoom settings updated successfully',
      data: existingZoomSettings,
    });
  } catch (error) {
    console.error('Error updating Zoom settings:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = updateZoomSettings;
