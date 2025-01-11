const signup = require("../controllers/User/signup");
const login = require("../controllers/User/login");

const meetingRoutes = require("./meeting");
const attendanceRoutes = require("./attendance");
const calendarRoutes = require("./calendar");
const incomeExpenseChartRoutes = require("./incomeExpenseChart");
const dashPayrollRoutes = require("./payroll");
const accountStatementRoutes = require("./accountstatment");

const branchRoutes = require("./branch");
const departmentRoutes = require("./department");
const designationRoutes = require("./designation");
const contractTypeRoute = require("./contractType");

const employeeRoutes = require("./employee");

const manageLeaveRoutes = require("./manageLeave");
const timeSheetRoutes = require("./timeSheet");
const MarkedAttendance = require("./markedAttendance");

const indicatorRoutes = require("./indicator");
const appraisalRoutes = require("./appraisal");

const hrAdminSetupRoutes = require("./hrAdminSetup");
const contractRoutes = require("./contract");

module.exports = (app) => {
  app.post("/api/signup", signup);
  app.post("/api/login", login);

  app.use("/api", meetingRoutes);

  app.use("/api", attendanceRoutes);

  app.use("/api", calendarRoutes);

  app.use("/api", incomeExpenseChartRoutes);

  app.use("/api", branchRoutes);

  app.use("/api", departmentRoutes);

  app.use("/api", designationRoutes);

  app.use("/api", contractTypeRoute);

  app.use("/api", employeeRoutes);

  app.use("/api", manageLeaveRoutes);

  app.use("/api", timeSheetRoutes);

  app.use("/api", MarkedAttendance);

  app.use("/api", indicatorRoutes);

  app.use("/api", appraisalRoutes);

  app.use("/api", hrAdminSetupRoutes);

  app.use("/api", contractRoutes);

  app.use("/api", dashPayrollRoutes);

  app.use("/api", accountStatementRoutes);
};
