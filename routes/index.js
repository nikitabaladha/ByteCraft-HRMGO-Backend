// routes/index.js
// const express = require("express");
const signup = require("../controllers/User/signup");
const login = require("../controllers/User/login");
const userDetails = require("../controllers/User/UserGetById")
const Middleware = require("../middleware/index.js");
const updateUserDetails = require("../controllers/User/updateUser.js")
const getAllUsers = require("../controllers/User/getAllUsers.js")
const deleteUser = require("../controllers/User/deleteUser.js")
const userUpdate = require("../controllers/User/updateUserDetails.js")
const changePassword = require("../controllers/User/changePassword.js")
const createPassword = require("../controllers/User/createPassword.js")
const resetPasswordUser = require("../controllers/User/resetPasswordUser.js")
const conversation = require("./messenger.js")

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
const traineeRoutes = require("./Trainee")
const recruitmentCreateJob = require("./recruitment")
const systemSetting = require("./systemSetting")
const staffUserRoutes = require("./staffUser")
const upload = require("../controllers/uploadFiles");

const uploadFiles = (req, res, next) => {
  console.log("Request files:", req.files);
  upload.fields([
    { name: "profileImage", maxCount: 1 },
  ])(req, res, (err) => {
    if (err) {
      return next(err);
    }
    console.log("Uploaded files:", req.files);
    next();
  });
};

module.exports = (app) => {
  app.post("/api/signup", signup);
  app.post("/api/login", login);
  app.get("/api/get-user-details", Middleware, userDetails)
  app.put("/api/update", uploadFiles, Middleware,  updateUserDetails)
  app.get("/api/get-all-users", Middleware, getAllUsers)
  app.delete("/api/delete-user/:id", Middleware, deleteUser)
  app.put("/api/update-user/:id", Middleware, userUpdate)
  app.put("/api/change-password", Middleware, changePassword)
  app.post("/api/create-password", Middleware, createPassword)
  app.put("/api/reset-password-user", Middleware, resetPasswordUser)

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

  app.use("/api", traineeRoutes);

  app.use("/api", recruitmentCreateJob);

  app.use("/api", systemSetting)

  app.use("/api", staffUserRoutes)

  app.use("/api", conversation)
};
