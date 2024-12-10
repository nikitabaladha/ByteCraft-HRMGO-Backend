const ZoomMeeting = require("../../../models/ZoomMeeting");

async function updateMeetingStatus(req, res) {
  try {
    const { meetingId } = req.params; // Extract meetingId from the URL params
    const { status } = req.body; // Extract status from the request body

    // Validate that the status is valid
    const validStatuses = ["Waiting", "Starting", "Ended"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid status value.",
        hasError: true,
      });
    }

    // Find and update the meeting status
    const updatedMeeting = await ZoomMeeting.findByIdAndUpdate(
      meetingId,
      { status }, // Update the status field
      { new: true } // Return the updated document
    );

    if (!updatedMeeting) {
      return res.status(404).json({
        message: "Meeting not found.",
        hasError: true,
      });
    }

    return res.status(200).json({
      message: "Meeting status updated successfully!",
      meeting: updatedMeeting, // Return the updated meeting data
      hasError: false,
    });
  } catch (error) {
    console.error("Error updating meeting status:", error);
    return res.status(500).json({
      message: "Failed to update meeting status.",
      error: error.message,
      hasError: true,
    });
  }
}

module.exports = updateMeetingStatus;
