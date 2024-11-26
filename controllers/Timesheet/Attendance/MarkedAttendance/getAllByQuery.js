const mongoose = require("mongoose");
const moment = require("moment");
const MarkedAttendance = require("../../../../models/MarkedAttendance");

async function getAllByQuery(req, res) {
  try {
    const { branch, department, month, employee } = req.query;

    // Initialize filters
    const filter = {};
    const dateFilter = {};

    // Filter by month (ensure it's a valid date)
    if (month) {
      const startOfMonth = moment(month).startOf("month").toDate();
      const endOfMonth = moment(month).endOf("month").toDate();
      dateFilter.date = { $gte: startOfMonth, $lte: endOfMonth };
    }

    // If multiple employees are provided, filter by multiple employee IDs
    if (employee) {
      // Check if `employee` is an array or a single value
      const employeeIds = Array.isArray(employee) ? employee : [employee];
      filter["employeeId"] = {
        $in: employeeIds.map((emp) => new mongoose.Types.ObjectId(emp)),
      };
    }

    // Retrieve marked attendance based on the filters
    const markedAttendanceRecords = await MarkedAttendance.find({
      ...filter,
      ...dateFilter,
    })
      .populate({
        path: "employeeId", // Populate the employeeId field
        select: "name branchId departmentId", // Select only relevant fields from Employee
        match: {
          // Filter the employee based on branchId and departmentId
          branchId: branch ? new mongoose.Types.ObjectId(branch) : undefined,
          departmentId: department
            ? new mongoose.Types.ObjectId(department)
            : undefined,
        },
        populate: [
          { path: "branchId", select: "branchName" }, // Populate branch details
          { path: "departmentId", select: "departmentName" }, // Populate department details
        ],
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
        const branchName = attendance.employeeId.branchId
          ? attendance.employeeId.branchId.branchName
          : "";
        const departmentName = attendance.employeeId.departmentId
          ? attendance.employeeId.departmentId.departmentName
          : "";

        // Initialize the employee group if not already present
        if (!acc[employeeId]) {
          acc[employeeId] = {
            employeeId,
            employeeName,
            branchName,
            departmentName,
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

    // If a single employee is selected, return only that employee's data
    if (employee && groupedAttendanceData.length === 1) {
      return res.status(200).json({
        message: "Employee's Marked Attendance retrieved successfully!",
        totalEmployees: 1,
        data: groupedAttendanceData[0],
        hasError: false,
      });
    }

    // Response data structure
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
