const MarkedAttendance = require("../../../../models/MarkedAttendance");
const Employee = require("../../../../models/Employee");

async function getAll(req, res) {
  try {
    const markedAttendanceRecords = await MarkedAttendance.find()
      .populate({
        path: "employeeId",
        select: "name",
      })
      .select("employeeId date hrs");

    const records = await MarkedAttendance.find().populate("employeeId");
    console.log(records);

    const response = markedAttendanceRecords.map((record) => ({
      employee: record.employeeId.name,
      date: record.date.toISOString().split("T")[0],
      hours: record.hrs,
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
