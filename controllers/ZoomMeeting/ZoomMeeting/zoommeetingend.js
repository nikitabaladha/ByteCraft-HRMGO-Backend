const axios = require("axios");
const ZoomMeeting = require("./models/ZoomMeeting");

async function checkMeetingStatus() {
  try {
    const activeMeetings = await ZoomMeeting.find({ status: "Waiting" });

    for (const meeting of activeMeetings) {
      const zoomApiUrl = `https://api.zoom.us/v2/meetings/${meeting.meeting_code}`;
      const authToken = "eyJzdiI6IjAwMDAwMiIsImFsZyI6IkhTNTEyIiwidiI6IjIuMCIsImtpZCI6ImYwY2JjODBmLTA0ZTAtNGQ2Mi1iMmUwLTdkNWU3ZDE5ZTU3MCJ9.eyJhdWQiOiJodHRwczovL29hdXRoLnpvb20udXMiLCJ1aWQiOiItU3dNYjd4YVRHU3poRWo3R3Btbl9RIiwidmVyIjoxMCwiYXVpZCI6ImUxNGMwMGUxOThiMjBkOTg4NGU0NGRiNTA2MDVlMThiYWRiYjlkYThkYjliYTQzN2FiNDIwOTdlMzUwODEzMjciLCJuYmYiOjE3MzM4MTcyNDAsImNvZGUiOiJ6YUh0Q3dpMFJ5S1dyX0VyRmlGLVB3WEhEajlCVk9aQmIiLCJpc3MiOiJ6bTpjaWQ6TXdLczJKVFN6ZVlfZVVNUEdvVTNRIiwiZ25vIjowLCJleHAiOjE3MzM4MjA4NDAsInR5cGUiOjMsImlhdCI6MTczMzgxNzI0MCwiYWlkIjoiVng1eS1QOE9TZjJZUnFmODFBdXdQUSJ9.uJolf4cp3Bol0zjgp0TK-04QWEaY6kwuvtaTZfmsXiycy2UlmXELc4YRs4_CS3ujJPjh8Lq9G7qNZVQ_m15O3g";

      const zoomResponse = await axios.get(zoomApiUrl, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      });

      if (zoomResponse.data.status === "ended") {
        meeting.status = "Ended";
        await meeting.save();
        console.log(`Meeting ${meeting.meeting_code} status updated to Ended.`);
      }
    }
  } catch (error) {
    console.error("Error checking meeting status:", error);
  }
}


setInterval(checkMeetingStatus, 1000);
