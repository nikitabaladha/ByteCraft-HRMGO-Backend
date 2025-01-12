const Employee = require("../../../models/Employee");
const moment = require("moment");
const MarkedAttendance = require("../../../models/MarkedAttendance");

async function getFilteredEmployeesByMonth(req, res) {
  const { branch, department, month, employee } = req.query;
  const query = {};

  if (branch) {
    query.branchId = branch;
  }

  if (department) {
    query.departmentId = department;
  }

  if (employee) {
    query._id = employee;
  }

  try {
    const employees = await Employee.find(query)
      .populate("branchId", "branchName")
      .populate("departmentId", "departmentName")
      .populate("designationId", "designationName")
      .lean();

    let attendanceRecords = [];

    if (month) {
      const startOfMonth = moment(month).startOf("month").toISOString();
      const endOfMonth = moment(month).endOf("month").toISOString();

      attendanceRecords = await MarkedAttendance.find({
        date: { $gte: startOfMonth, $lte: endOfMonth },
        employeeId: { $in: employees.map((employee) => employee._id) },
      }).lean(); // Add .lean() to get plain JavaScript objects
    }

    const employeeData = employees.map((employee) => {
      const employeeAttendance = attendanceRecords
        .filter(
          (record) => record.employeeId.toString() === employee._id.toString()
        )
        .map((attendance) => ({
          date: attendance.date,
          status: attendance.status,
          clockIn: attendance.clockIn,
          clockOut: attendance.clockOut,
          late: attendance.late,
          earlyLeaving: attendance.earlyLeaving,
          overtime: attendance.overtime,
          createdAt: attendance.createdAt,
          _id: attendance._id,
        }));

      return {
        employeeId: employee._id,
        employeeName: employee.name,
        branchName: employee.branchId?.branchName,
        branchId: employee.branchId._id,
        departmentName: employee.departmentId?.departmentName,
        departmentId: employee.departmentId._id,
        designation: employee.designationId?.designationName,
        designationId: employee.designationId._id,
        attendance: employeeAttendance.length > 0 ? employeeAttendance : null,
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

module.exports = getFilteredEmployeesByMonth;
