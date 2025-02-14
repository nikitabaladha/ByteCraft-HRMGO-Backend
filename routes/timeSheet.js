const express = require("express");
const router = express.Router();
const Middleware = require("../middleware/index.js");

const {
  createTimeSheet,
  getAllTimeSheet,
} = require("../controllers/Timesheet");

router.post("/timesheet", Middleware, createTimeSheet);
router.get("/timesheet-get-all", Middleware, getAllTimeSheet);

module.exports = router;
