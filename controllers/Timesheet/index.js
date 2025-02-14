const createManageLeave = require("./ManageLeave/create");
const getAllManageLeave = require("./ManageLeave/getAll");
const updateStatus = require("./ManageLeave/updateStatus");
const updateByLeaveId = require("./ManageLeave/updateByLeaveId");
const getAllByQuery = require("./ManageLeave/getAllByQuery");
const deleteLeaveById = require("./ManageLeave/deleteById");

const createTimeSheet = require("./TimeSheet/create");
const getAllTimeSheet = require("./TimeSheet/getAll");

const createMarkedAttendance = require("./Attendance/MarkedAttendance/create");
const getAllMarkedAttendanceByDateType = require("./Attendance/MarkedAttendance/getAllByDateType");
const getAllMarkedAttendanceByQuery = require("./Attendance/MarkedAttendance/getAllByQuery");
const getAllForCurrentMonth = require("./Attendance/MarkedAttendance/getAllForCurrentMonth");
const getAttendance = require("./Attendance/MarkedAttendance/getAttendance");
const getAllAttendance = require("./Attendance/MarkedAttendance/getAll");
const updateMarkedAttendance = require("./Attendance/MarkedAttendance/updateMarkedAttendance");
const deleteMarkedAttendanceById = require("./Attendance/MarkedAttendance/deleteById");

module.exports = {
  createManageLeave,
  getAllManageLeave,
  updateStatus,
  updateByLeaveId,
  getAllByQuery,
  deleteLeaveById,

  createTimeSheet,
  getAllTimeSheet,

  createMarkedAttendance,
  getAllMarkedAttendanceByDateType,

  createTimeSheet,
  getAllTimeSheet,

  createMarkedAttendance,
  getAllMarkedAttendanceByDateType,
  getAllMarkedAttendanceByQuery,
  getAllForCurrentMonth,
  getAttendance,
  getAllAttendance,
  updateMarkedAttendance,
  deleteMarkedAttendanceById,
};
