const mongoose = require("mongoose");
const moment = require("moment");
const MarkedAttendance = require("../../../../models/MarkedAttendance");

async function getAllForCurrentMonth(req, res) {
  try {
    const filter = {};
    const dateFilter = {};

    const startOfMonth = moment().startOf("month").toDate();
    const endOfMonth = moment().endOf("month").toDate();

    dateFilter.date = { $gte: startOfMonth, $lte: endOfMonth };

    const markedAttendanceRecords = await MarkedAttendance.find({
      ...filter,
      ...dateFilter,
    })
      .populate({
        path: "employeeId",
        select: "name",
      })
      .lean()
      .exec();

    console.log("Marked Attendance Records:", markedAttendanceRecords);

    const groupedAttendance = markedAttendanceRecords
      .filter((attendance) => attendance.employeeId != null)
      .reduce((acc, attendance) => {
        const employeeId = attendance.employeeId._id.toString();
        const employeeName = attendance.employeeId.name;

        if (!acc[employeeId]) {
          acc[employeeId] = {
            employeeId,
            employeeName,
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

    return res.status(200).json({
      message:
        "Grouped Marked Attendance for Current Month retrieved successfully!",
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

module.exports = getAllForCurrentMonth;
