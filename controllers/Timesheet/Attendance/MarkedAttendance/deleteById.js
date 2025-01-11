const MarkedAttendance = require("../../../../models/MarkedAttendance");

async function deleteById(req, res) {
  const { id } = req.params;

  try {
    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        hasError: true,
        message: "Invalid attendance ID format",
      });
    }

    const attendanceRecord = await MarkedAttendance.findById(id);
    if (!attendanceRecord) {
      return res.status(404).json({
        hasError: true,
        message: "Attendance record not found",
      });
    }

    await MarkedAttendance.findByIdAndDelete(id);

    return res.status(200).json({
      hasError: false,
      message: "Attendance record deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting attendance record:", error.message);
    return res.status(500).json({
      hasError: true,
      message: "Server error",
      error: error.message,
    });
  }
}

module.exports = deleteById;
