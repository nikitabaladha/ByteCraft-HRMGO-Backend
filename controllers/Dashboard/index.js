const createMeeting = require("./Meeting/create");
const getAllMeeting = require("./Meeting/getAll");

const createAttendance = require("./Attendance/create");
const getAllAttendance = require("./Attendance/getAll");

const createCalendar = require("./Calendar/create");
const getAllCalendar = require("./Calendar/getAll");

const createIncomeExpenseChart = require("./IncomeExpenseChart/create");
const getAllIncomeExpenseChart = require("./IncomeExpenseChart/getAll");

const getAllByDatetype = require("./Payroll/getAllByDateType");

const getAllAccountname = require("./AccountStatement/getAllAccountName");
const getAccountBydate = require("./AccountStatement/getAllAccountbydate");

module.exports = {
  createMeeting,
  getAllMeeting,

  createAttendance,
  getAllAttendance,

  createCalendar,
  getAllCalendar,

  createIncomeExpenseChart,
  getAllIncomeExpenseChart,

  getAllByDatetype,

  getAllAccountname,
  getAccountBydate,
};
