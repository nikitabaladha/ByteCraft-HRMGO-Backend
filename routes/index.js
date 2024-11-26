// routes/index.js
// const express = require("express");
const signup = require("../controllers/User/signup");
const login = require("../controllers/User/login");

const dashboardRoutes = require("./dashboard");
const meetingRoutes = require("./meeting");
const attendanceRoutes = require("./attendance");
const announcementRoutes = require("./announcement");
const calendarRoutes = require("./calendar");
const incomeExpenseChartRoutes = require("./incomeExpenseChart");

const branchRoutes = require("./branch");
const departmentRoutes = require("./department");
const designationRoutes = require("./designation");

const employeeRoutes = require("./employee");

const manageLeaveRoutes = require("./manageLeave");
const timeSheetRoutes = require("./timeSheet");
const MarkedAttendance = require("./markedAttendance");

const performanceRoutes = require("./performance");
const competencyRoutes = require("./competency");
const competencyListRoutes = require("./competencyList");

const indicatorRoutes = require("./indicator");
const appraisalRoutes = require("./appraisal");

module.exports = (app) => {
  app.post("/api/signup", signup);
  app.post("/api/login", login);

  app.use("/api", dashboardRoutes); // This mounts the dashboard routes

  app.use("/api", meetingRoutes); // This mounts the meeting routes

  app.use("/api", attendanceRoutes); // This mounts the attendanceRoutes routes

  app.use("/api", announcementRoutes); // This mounts the announcementRoutes routes

  app.use("/api", calendarRoutes); // This mounts the calendarRoutes routes

  app.use("/api", incomeExpenseChartRoutes); // This mounts the incomeExpenseChartRoutes routes

  app.use("/api", branchRoutes); // This mounts the branchRoutes routes

  app.use("/api", departmentRoutes); // This mounts the departmentRoutes routes

  app.use("/api", designationRoutes); // This mounts the designationRoutes routes

  app.use("/api", employeeRoutes); // This mounts the employeeRoutes routes

  app.use("/api", manageLeaveRoutes); // This mounts the manageLeaveRoutes routes

  app.use("/api", timeSheetRoutes); // This mounts the timeSheetRoutes routes

  app.use("/api", MarkedAttendance); // This mounts the MarkedAttendance routes

  app.use("/api", performanceRoutes); // This mounts the performanceRoutes routes

  app.use("/api", competencyRoutes); // This mounts the performanceRoutes routes with

  app.use("/api", competencyListRoutes); // This mounts the performanceRoutes routes with

  app.use("/api", indicatorRoutes);

  app.use("/api", appraisalRoutes);
};
