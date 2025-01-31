const mongoose = require("mongoose");
const moment = require("moment");
const MarkedAttendance = require("../../../../models/MarkedAttendance");

async function getAllByQuery(req, res) {
  try {
    const { branch, department, month, employee } = req.query;

    const filter = {};
    const dateFilter = {};

    if (month) {
      const startOfMonth = moment(month).startOf("month").toDate();
      const endOfMonth = moment(month).endOf("month").toDate();
      dateFilter.date = { $gte: startOfMonth, $lte: endOfMonth };
    }

    if (employee) {
      const employeeIds = Array.isArray(employee) ? employee : [employee];
      filter["employeeId"] = {
        $in: employeeIds.map((emp) => new mongoose.Types.ObjectId(emp)),
      };
    }

    const markedAttendanceRecords = await MarkedAttendance.find({
      ...filter,
      ...dateFilter,
    })
      .populate({
        path: "employeeId",
        select: "name branchId departmentId",
        match: {
          branchId: branch ? new mongoose.Types.ObjectId(branch) : undefined,
          departmentId: department
            ? new mongoose.Types.ObjectId(department)
            : undefined,
        },
        populate: [
          { path: "branchId", select: "branchName" },
          { path: "departmentId", select: "departmentName" },
        ],
      })
      .lean()
      .exec();

    console.log("Marked Attendance Records:", markedAttendanceRecords);

    const groupedAttendance = markedAttendanceRecords
      .filter((attendance) => attendance.employeeId != null)
      .reduce((acc, attendance) => {
        const employeeId = attendance.employeeId._id.toString();
        const employeeName = attendance.employeeId.name;
        const branchName = attendance.employeeId.branchId
          ? attendance.employeeId.branchId.branchName
          : "";
        const departmentName = attendance.employeeId.departmentId
          ? attendance.employeeId.departmentId.departmentName
          : "";

        if (!acc[employeeId]) {
          acc[employeeId] = {
            employeeId,
            employeeName,
            branchName,
            departmentName,
            attendance: [],
          };
        }

        const formattedAttendance = {
          date: moment.utc(attendance.date).format("MMM D, YYYY"),
          status: attendance.status,
          late: attendance.late || "00:00:00",
          earlyLeaving: attendance.earlyLeaving || "00:00:00",
          overtime: attendance.overtime || "00:00:00",
        };

        acc[employeeId].attendance.push(formattedAttendance);

        return acc;
      }, {});

    const groupedAttendanceData = Object.values(groupedAttendance);

    if (employee && groupedAttendanceData.length === 1) {
      return res.status(200).json({
        message: "Employee's Marked Attendance retrieved successfully!",
        totalEmployees: 1,
        data: groupedAttendanceData[0],
        hasError: false,
      });
    }

    return res.status(200).json({
      message: "Grouped Marked Attendance retrieved successfully!",
      totalEmployees: groupedAttendanceData.length,
      data: groupedAttendanceData,
      hasError: false,
    });
  } catch (error) {
    console.error("Error retrieving marked attendance:", error);
    return res.status(500).json({
      message: "Failed to retrieve marked attendees",
      error: error.message,
      hasError: true,
    });
  }
}

module.exports = getAllByQuery;
