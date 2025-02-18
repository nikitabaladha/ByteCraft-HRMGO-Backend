// const ZoomMeetingSettings = require('../../../models/ZoomMeetingSetting');

// const updateZoomSettings = async (req, res) => {
//   try {
//     const { zoom_account_id, zoom_client_id, zoom_client_secret } = req.body;

//     if (!zoom_account_id || !zoom_client_id || !zoom_client_secret) {
//       return res.status(400).json({ message: 'All fields are required' });
//     }

//     const existingZoomSettings = await ZoomMeetingSettings.findOne();

//     if (!existingZoomSettings) {
//       return res.status(404).json({ message: 'Zoom settings not found' });
//     }

//     existingZoomSettings.zoom_account_id = zoom_account_id;
//     existingZoomSettings.zoom_client_id = zoom_client_id;
//     existingZoomSettings.zoom_client_secret = zoom_client_secret;

//     await existingZoomSettings.save();

//     return res.status(200).json({
//       message: 'Zoom settings updated successfully',
//       data: existingZoomSettings,
//     });
//   } catch (error) {
//     console.error('Error updating Zoom settings:', error);
//     return res.status(500).json({ message: 'Server error' });
//   }
// };

// module.exports = updateZoomSettings;

const ZoomMeetingSettings = require('../../../models/ZoomMeetingSetting');

const updateZoomSettings = async (req, res) => {
  try {
    const { zoom_account_id, zoom_client_id, zoom_client_secret } = req.body;

    // Validate required fields
    if (!zoom_account_id || !zoom_client_id || !zoom_client_secret) {
      return res.status(400).json({
        message: 'All fields are required.',
        requiredFields: ['zoom_account_id', 'zoom_client_id', 'zoom_client_secret'],
      });
    }

    // Use findOneAndUpdate with upsert: true
    const updatedSettings = await ZoomMeetingSettings.findOneAndUpdate(
      {}, // Empty filter to match any document
      {
        zoom_account_id,
        zoom_client_id,
        zoom_client_secret,
      },
      {
        new: true, // Return the updated document
        upsert: true, // Create if it doesn't exist
        setDefaultsOnInsert: true, // Apply default values if creating
      }
    );

    return res.status(200).json({
      message: 'Zoom settings updated successfully.',
      data: updatedSettings,
    });
  } catch (error) {
    console.error('Error updating Zoom settings:', error);
    return res.status(500).json({
      message: 'Internal server error.',
      error: error.message, // Include error message for debugging
    });
  }
};

module.exports = updateZoomSettings;
