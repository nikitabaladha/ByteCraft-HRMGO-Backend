const express = require("express");
const router = express.Router();
const Middleware = require("../middleware/index.js");

const {
  createMarkedAttendance,
  getAllMarkedAttendanceByDateType,
  getAllMarkedAttendanceByQuery,
  getAllForCurrentMonth,
  getAttendance,
  getAllAttendance,
} = require("../controllers/Timesheet");

router.post("/marked-attendance", Middleware, createMarkedAttendance);
router.get(
  "/marked-attendance-get-all",
  Middleware,
  getAllMarkedAttendanceByDateType
);
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
router.get("/marked-attendance-get", Middleware, getAllAttendance);

module.exports = router;
