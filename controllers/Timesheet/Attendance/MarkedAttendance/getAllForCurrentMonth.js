const mongoose = require("mongoose");
const moment = require("moment");
const MarkedAttendance = require("../../../../models/MarkedAttendance");

async function getAllForCurrentMonth(req, res) {
  try {
    // Initialize filters
    const filter = {};
    const dateFilter = {};

    // Get the current month start and end dates
    const startOfMonth = moment().startOf("month").toDate();
    const endOfMonth = moment().endOf("month").toDate();

    // Apply the date filter for current month
    dateFilter.date = { $gte: startOfMonth, $lte: endOfMonth };

    // Retrieve marked attendance for the current month (no branch or department filter)
    const markedAttendanceRecords = await MarkedAttendance.find({
      ...filter,
      ...dateFilter,
    })
      .populate({
        path: "employeeId", // Populate the employeeId field
        select: "name", // Select only the relevant fields (name in this case)
      })
      .lean()
      .exec();

    console.log("Marked Attendance Records:", markedAttendanceRecords);

    // Group attendance data by employeeId and employeeName
    const groupedAttendance = markedAttendanceRecords
      .filter((attendance) => attendance.employeeId != null)
      .reduce((acc, attendance) => {
        const employeeId = attendance.employeeId._id.toString();
        const employeeName = attendance.employeeId.name;

        // Initialize the employee group if not already present
        if (!acc[employeeId]) {
          acc[employeeId] = {
            employeeId,
            employeeName,
            attendance: [],
          };
        }

        // Format the attendance record
        const formattedAttendance = {
          date: moment.utc(attendance.date).format("MMM D, YYYY"),
          status: attendance.status,
          late: attendance.late || "00:00:00",
          earlyLeaving: attendance.earlyLeaving || "00:00:00",
          overtime: attendance.overtime || "00:00:00",
        };

        // Add the attendance record to the employee's array
        acc[employeeId].attendance.push(formattedAttendance);

        return acc;
      }, {});

    // Convert grouped attendance to an array
    const groupedAttendanceData = Object.values(groupedAttendance);

    // Response data structure
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
