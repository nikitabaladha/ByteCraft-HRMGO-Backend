const MarkedAttendance = require("../../../../models/MarkedAttendance");
const Employee = require("../../../../models/Employee");

async function getAll(req, res) {
  try {
    // Fetch all marked attendance records with employee details
    const markedAttendanceRecords = await MarkedAttendance.find()
      .populate({
        path: "employeeId", // Populate the employeeId field
        select: "name", // Only fetch the name field from the Employee model
      })
      .select("employeeId date hrs"); // Fetch only employeeId, date, and hrs fields from MarkedAttendance

    const records = await MarkedAttendance.find().populate("employeeId");
    console.log(records); // Ensure the `employeeId` field resolves to actual Employee data

    // Map the data to include employee name instead of employeeId
    const response = markedAttendanceRecords.map((record) => ({
      employee: record.employeeId.name, // Extract the employee's name
      date: record.date.toISOString().split("T")[0], // Format the date (YYYY-MM-DD)
      hours: record.hrs, // Include the total working hours
    }));

    return res.status(200).json({
      hasError: false,
      message: "MarkedAttendance records fetched successfully",
      data: response,
    });
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
}

module.exports = getAll;
