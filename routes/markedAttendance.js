const express = require("express");
const router = express.Router();
const Middleware = require("../middleware/index.js");

const {
  createMarkedAttendance,
  getAllMarkedAttendance,
  getAllMarkedAttendanceByQuery,
  getAllForCurrentMonth,
  getAttendance,
} = require("../controllers/Timesheet");

router.post("/marked-attendance", Middleware, createMarkedAttendance);
router.get("/marked-attendance-get-all", Middleware, getAllMarkedAttendance);
router.get(
  "/marked-attendance-get-all-by-query",
  Middleware,
  getAllMarkedAttendanceByQuery
);
router.get(
  "/marked-attendance-get-all-current-month",
  Middleware,
  getAllForCurrentMonth
);
router.get("/marked-attendance-get-attendance", Middleware, getAttendance);

module.exports = router;
