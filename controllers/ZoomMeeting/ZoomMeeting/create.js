// const ZoomMeetingValidator = require("../../../validators/ZoomMeetingValidators/ZoomMeetingValidators");
// const ZoomMeeting = require("../../../models/ZoomMeeting");

// async function createZoomMeeting(req, res) {
//   try {
//     const { error } = ZoomMeetingValidator.validate(req.body);

//     if (error) {
//       const errorMessages = error.details.map((err) => err.message).join(", ");
//       return res.status(400).json({
//         message: errorMessages,
//         hasError: true,
//       });
//     }

//     const { title, employeeNames, start_date, duration, password, join_url, status } = req.body;

//     const newZoomMeeting = new ZoomMeeting({
//       title,
//       employeeNames,  // Changed from employeeIds to employeeNames
//       start_date,
//       duration,
//       password: password || "",
//       join_url: join_url || "",
//       status: status || "Waiting",
//     });

//     await newZoomMeeting.save();

//     return res.status(201).json({
//       message: "Zoom Meeting created successfully!",
//       meeting: newZoomMeeting,
//       hasError: false,
//     });
//   } catch (error) {
//     console.error("Error creating Zoom meeting:", error);
//     return res.status(500).json({
//       message: "Failed to create Zoom meeting.",
//       error: error.message,
//       hasError: true,
//     });
//   }
// }

// module.exports = createZoomMeeting;


const axios = require("axios");
const ZoomMeetingValidator = require("../../../validators/ZoomMeetingValidators/ZoomMeetingValidators");
const ZoomMeeting = require("../../../models/ZoomMeeting");

async function createZoomMeeting(req, res) {
  try {
    const { error } = ZoomMeetingValidator.validate(req.body);

    if (error) {
      const errorMessages = error.details.map((err) => err.message).join(", ");
      return res.status(400).json({
        message: errorMessages,
        hasError: true,
      });
    }

    const { title, employeeNames, start_date, duration, password } = req.body;


    const zoomApiUrl = "https://api.zoom.us/v2/users/me/meetings"; 

    const zoomPayload = {
      topic: title,
      type: 2, 
      start_time: new Date(start_date).toISOString(),
      duration: duration,
      password: password || "",
      settings: {
        join_before_host: true,
        mute_upon_entry: true,
        approval_type: 0,
      },
    };


    const authToken = "eyJzdiI6IjAwMDAwMiIsImFsZyI6IkhTNTEyIiwidiI6IjIuMCIsImtpZCI6IjlmYjA5NTI5LWYzMjctNDAyMS1hMGE0LWQxNTA4MTMyMThmYiJ9.eyJhdWQiOiJodHRwczovL29hdXRoLnpvb20udXMiLCJ1aWQiOiItU3dNYjd4YVRHU3poRWo3R3Btbl9RIiwidmVyIjoxMCwiYXVpZCI6ImUxNGMwMGUxOThiMjBkOTg4NGU0NGRiNTA2MDVlMThiYWRiYjlkYThkYjliYTQzN2FiNDIwOTdlMzUwODEzMjciLCJuYmYiOjE3MzUxODYxNzcsImNvZGUiOiJNQWRMczFmaVRuQ01ZT01PMWUxMG1nTU5PWFRvMzQ4ODYiLCJpc3MiOiJ6bTpjaWQ6TXdLczJKVFN6ZVlfZVVNUEdvVTNRIiwiZ25vIjowLCJleHAiOjE3MzUxODk3NzcsInR5cGUiOjMsImlhdCI6MTczNTE4NjE3NywiYWlkIjoiVng1eS1QOE9TZjJZUnFmODFBdXdQUSJ9.k4h4QGCtnkmJPLUJL1s3DajcXHlLLxGHvCFVdxx5edx87AXjGicvpMgi7V1XZHnanbzsM6hMVrdMfUq2u8mEDw"; // Replace with your valid OAuth access token

    const zoomResponse = await axios.post(zoomApiUrl, zoomPayload, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    });

    const zoomMeetingData = zoomResponse.data;


    const newZoomMeeting = new ZoomMeeting({
      title,
      employeeNames,
      start_date,
      duration,
      password: zoomMeetingData.password,
      join_url: zoomMeetingData.join_url,
      meeting_code: zoomMeetingData.id,
      status: "Waiting",
    });

    await newZoomMeeting.save();

    return res.status(201).json({
      message: "Zoom Meeting created successfully!",
      meeting: newZoomMeeting,
      hasError: false,
    });
  } catch (error) {
    console.error("Error creating Zoom meeting:", error);
    return res.status(500).json({
      message: "Failed to create Zoom meeting.",
      error: error.message,
      hasError: true,
    });
  }
}

module.exports = createZoomMeeting;

