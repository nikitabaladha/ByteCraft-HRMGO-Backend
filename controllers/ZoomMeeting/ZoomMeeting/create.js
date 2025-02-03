
const axios = require("axios");
const ZoomMeetingValidator = require("../../../validators/ZoomMeetingValidators/ZoomMeetingValidators");
const ZoomMeeting = require("../../../models/ZoomMeeting");

async function fetchZoomAuthToken() {
  try {
    const zoomAuthUrl = "https://zoom.us/oauth/token";
    const clientId = "MwKs2JTSzeY_eUMPGoU3Q"; 
    const clientSecret = "hRuSGhZqRNazoMvPStWNp9gdVCdQBIqq"; 
    const accountId = "Vx5y-P8OSf2YRqf81AuwPQ"; 

    const authHeader = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

    const response = await axios.post(
      zoomAuthUrl,
      `grant_type=account_credentials&account_id=${accountId}`,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${authHeader}`,
        },
      }
    );

    return response.data.access_token;
  } catch (error) {
    console.error("Error fetching Zoom auth token:", error.response?.data || error.message);
    throw new Error("Failed to fetch Zoom auth token.");
  }
}

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

    const authToken = await fetchZoomAuthToken();

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



