const express = require("express");
const router = express.Router();
const Middleware = require("../middleware/index.js");

// Controller imports
const {
  createZoomMeeting,
  getallzoomMeeting,
  deletezoommeeting,
  updatezoommeetingstatus

} = require("../controllers/ZoomMeeting");

// Define routes
router.post("/create_zoommeeting", Middleware, createZoomMeeting);
router.get("/getall_zoommeeting",Middleware,getallzoomMeeting);
router.delete("/delete_zoommeeting/:id",Middleware,deletezoommeeting)
router.put("/update_meeting_status/:meetingId",Middleware,updatezoommeetingstatus)


module.exports = router;