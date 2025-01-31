const ZoomMeetingSettings = require('../../../models/ZoomMeetingSetting');

const createZoomSettings = async (req, res) => {
  try {
    const { zoom_account_id, zoom_client_id, zoom_client_secret } = req.body;

    if (!zoom_account_id || !zoom_client_id || !zoom_client_secret) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newZoomSettings = new ZoomMeetingSettings({
      zoom_account_id,
      zoom_client_id,
      zoom_client_secret,
    });

    await newZoomSettings.save();

    return res.status(201).json({ message: 'Zoom settings created successfully', data: newZoomSettings });
  } catch (error) {
    console.error('Error creating Zoom settings:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = createZoomSettings;
