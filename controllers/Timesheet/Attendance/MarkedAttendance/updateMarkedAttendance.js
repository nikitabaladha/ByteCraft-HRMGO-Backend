const MarkedAttendance = require("../../../../models/MarkedAttendance");
const MarkedAttendanceValidator = require("../../../../validators/Timesheet/MarkedAttendance");

function formatDuration(durationMs) {
  const totalSeconds = Math.floor(durationMs / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}:${String(seconds).padStart(2, "0")}`;
}

async function updateMarkedAttendance(req, res) {
  try {
    // Ensure request supports batch or single update
    const records = Array.isArray(req.body) ? req.body : [req.body];
    const updatedRecords = [];

    for (const record of records) {
      // Validate each record
      const { error, value } =
        MarkedAttendanceValidator.MarkedUpdateUpdateValidator.validate(record);
      if (error?.details?.length) {
        const errorMessages = error.details
          .map((err) => err.message)
          .join(", ");
        return res.status(400).json({ message: errorMessages });
      }

      const { employeeId, date, clockIn, clockOut, status } = value;

      // Parse and format dates
      const formattedDate = new Date(date);
      const formattedClockIn = new Date(clockIn);
      const formattedClockOut = new Date(clockOut);

      // Check if attendance exists
      const existingAttendance = await MarkedAttendance.findOne({
        employeeId,
        date: formattedDate,
      });

      if (!existingAttendance) {
        console.log(
          `Attendance record for ${employeeId} on ${formattedDate.toISOString()} not found.`
        );
        continue;
      }

      // Calculate total working duration and derived fields
      const totalWorkingDuration = formattedClockOut - formattedClockIn;
      const totalWorkingHours = formatDuration(totalWorkingDuration);

      const idealClockIn = new Date(formattedDate);
      idealClockIn.setUTCHours(9, 0, 0, 0);

      const idealClockOut = new Date(formattedDate);
      idealClockOut.setUTCHours(18, 0, 0, 0);

      let lateDuration = 0;
      let earlyLeavingDuration = 0;
      let overtimeDuration = 0;

      if (formattedClockIn > idealClockIn) {
        lateDuration = formattedClockIn - idealClockIn;
      }

      if (formattedClockOut < idealClockOut) {
        earlyLeavingDuration = idealClockOut - formattedClockOut;
      }

      if (formattedClockOut > idealClockOut) {
        overtimeDuration = formattedClockOut - idealClockOut;
      }

      const late = formatDuration(lateDuration);
      const earlyLeaving = formatDuration(earlyLeavingDuration);
      const overtime = formatDuration(overtimeDuration);

      // Update only relevant fields in the existing record
      (existingAttendance.clockIn =
        status === "Present" ? formattedClockIn : null),
        (existingAttendance.clockOut =
          status === "Present" ? formattedClockOut : null),
        (existingAttendance.late = late);
      existingAttendance.earlyLeaving = earlyLeaving;
      existingAttendance.overtime = overtime;
      existingAttendance.hrs = totalWorkingHours;

      // Save the updated record
      await existingAttendance.save();
      updatedRecords.push(existingAttendance);
    }

    // Respond with success and updated records
    return res.status(200).json({
      hasError: false,
      message: "MarkedAttendance record(s) updated successfully",
      data: updatedRecords,
    });
  } catch (error) {
    console.error("Error updating attendance:", error.message);
    return res.status(500).json({
      hasError: true,
      message: "Server error occurred while updating attendance records",
      error: error.message,
    });
  }
}

module.exports = updateMarkedAttendance;
