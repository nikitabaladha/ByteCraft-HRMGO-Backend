const ZoomMeeting = require("../../../models/ZoomMeeting");

async function updateMeetingStatus(req, res) {
  try {
    const { meetingId } = req.params; 
    const { status } = req.body; 

  
    const validStatuses = ["Waiting", "Starting", "Ended"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid status value.",
        hasError: true,
      });
    }

    
    const updatedMeeting = await ZoomMeeting.findByIdAndUpdate(
      meetingId,
      { status }, 
      { new: true } 
    );

    if (!updatedMeeting) {
      return res.status(404).json({
        message: "Meeting not found.",
        hasError: true,
      });
    }

    return res.status(200).json({
      message: "Meeting status updated successfully!",
      meeting: updatedMeeting, 
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
