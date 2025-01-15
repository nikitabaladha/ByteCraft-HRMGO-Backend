// finally using api

const Employee = require("../../../models/Employee");
const moment = require("moment");
const MarkedAttendance = require("../../../models/MarkedAttendance");

async function getFilteredEmployees(req, res) {
  const { branchId, departmentId, date } = req.query;
  const query = {};

  if (branchId) {
    query.branchId = branchId;
  }

  if (departmentId) {
    query.departmentId = departmentId;
  }

  try {
    const employees = await Employee.find(query)
      .populate("branchId", "branchName")
      .populate("departmentId", "departmentName")
      .populate("designationId", "designationName")
      .lean();

    let attendanceRecords = [];

    if (date) {
      const attendanceDate = moment(date).startOf("day").toISOString();
      const endOfDay = moment(date).endOf("day").toISOString();

      attendanceRecords = await MarkedAttendance.find({
        date: { $gte: attendanceDate, $lte: endOfDay },
        employeeId: { $in: employees.map((employee) => employee._id) },
      });
    }

    const employeeData = employees.map((employee) => {
      const attendance = attendanceRecords.find(
        (record) => record.employeeId.toString() === employee._id.toString()
      );

      return {
        _id: employee._id,
        id: employee.id,
        name: employee.name,
        email: employee.email,
        branchName: employee.branchId?.branchName,
        branchId: employee.branchId._id,
        departmentName: employee.departmentId?.departmentName,
        departmentId: employee.departmentId._id,
        designation: employee.designationId?.designationName,
        designationId: employee.designationId._id,
        joiningDate: employee.joiningDate,
        attendance: attendance
          ? {
              date: attendance.date,
              status: attendance.status,
              clockIn: attendance.clockIn,
              clockOut: attendance.clockOut,
              late: attendance.late,
              earlyLeaving: attendance.earlyLeaving,
              overtime: attendance.overtime,
              _id: attendance._id,
            }
          : null,
        __v: employee.__v,
      };
    });

    return res.status(200).json({
      message: "Filtered employees retrieved successfully!",
      data: employeeData,
      hasError: false,
    });
  } catch (error) {
    console.error("Error retrieving filtered employees:", error);
    return res.status(500).json({
      message: "Failed to retrieve filtered employees.",
      error: error.message,
    });
  }
}

module.exports = getFilteredEmployees;