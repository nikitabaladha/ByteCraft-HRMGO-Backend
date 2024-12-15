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

    // Step 1: Set up Zoom API request data
    const zoomApiUrl = "https://api.zoom.us/v2/users/me/meetings"; // Use 'me' for the authenticated user

    const zoomPayload = {
      topic: title,
      type: 2, // Scheduled meeting
      start_time: new Date(start_date).toISOString(),
      duration: duration, // Duration in minutes
      password: password || "",
      settings: {
        join_before_host: true,
        mute_upon_entry: true,
        approval_type: 0, // Automatically approve
      },
    };

    // Step 2: Use OAuth token in the authorization header
    const authToken = "eyJzdiI6IjAwMDAwMiIsImFsZyI6IkhTNTEyIiwidiI6IjIuMCIsImtpZCI6IjNiZmNkMjYyLTVmMjAtNDM1MS1hNDA4LWQzMjM0MGE1NjM0NiJ9.eyJhdWQiOiJodHRwczovL29hdXRoLnpvb20udXMiLCJ1aWQiOiItU3dNYjd4YVRHU3poRWo3R3Btbl9RIiwidmVyIjoxMCwiYXVpZCI6ImUxNGMwMGUxOThiMjBkOTg4NGU0NGRiNTA2MDVlMThiYWRiYjlkYThkYjliYTQzN2FiNDIwOTdlMzUwODEzMjciLCJuYmYiOjE3MzM5MDk2NjEsImNvZGUiOiJoM0JsNi1oaVFHaTlMVE9iUFk5d2F3RW1KMk9RVlczMEciLCJpc3MiOiJ6bTpjaWQ6TXdLczJKVFN6ZVlfZVVNUEdvVTNRIiwiZ25vIjowLCJleHAiOjE3MzM5MTMyNjEsInR5cGUiOjMsImlhdCI6MTczMzkwOTY2MSwiYWlkIjoiVng1eS1QOE9TZjJZUnFmODFBdXdQUSJ9.BhH3lkvw9tjoi8OmGyk6Vrc64ol6o_vTsrc4U4gECEziq6sHrULjQSAN7cvytNc3j4EZX_UUufj6PnhVjPb39Q"; // Replace with your valid OAuth access token

    const zoomResponse = await axios.post(zoomApiUrl, zoomPayload, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    });

    const zoomMeetingData = zoomResponse.data;

    // Step 3: Save meeting details in your database
    const newZoomMeeting = new ZoomMeeting({
      title,
      employeeNames,
      start_date,
      duration,
      password: zoomMeetingData.password,
      join_url: zoomMeetingData.join_url,
      meeting_code: zoomMeetingData.id,
      status: "Waiting", // Assuming status is 'Waiting' when created
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

