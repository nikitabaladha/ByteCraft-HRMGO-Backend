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

async function create(req, res) {
  try {
    const records = Array.isArray(req.body) ? req.body : [req.body];
    const createdRecords = [];

    for (const record of records) {
      const { error, value } = MarkedAttendanceValidator.validate(record);

      if (error?.details?.length) {
        const errorMessages = error.details
          .map((err) => err.message)
          .join(", ");
        return res.status(400).json({ message: errorMessages });
      }

      const { employeeId, date, status, clockIn, clockOut } = value;

      const formattedDate = new Date(date);
      const formattedClockIn = new Date(clockIn);
      const formattedClockOut = new Date(clockOut);

      // Calculate total working hours (clockOut - clockIn)
      const totalWorkingDuration = formattedClockOut - formattedClockIn;
      const totalWorkingHours = formatDuration(totalWorkingDuration);

      // Construct ideal clock-in and clock-out times (9:00 AM - 6:00 PM)
      const idealClockIn = new Date(formattedDate);
      idealClockIn.setUTCHours(9, 0, 0, 0); // 09:00:00 UTC

      const idealClockOut = new Date(formattedDate);
      idealClockOut.setUTCHours(18, 0, 0, 0); // 18:00:00 UTC

      // Calculate late, early leaving, and overtime
      let lateDuration = 0;
      let earlyLeavingDuration = 0;
      let overtimeDuration = 0;

      if (formattedClockIn > idealClockIn) {
        lateDuration = formattedClockIn - idealClockIn;
      }

      if (formattedClockOut < idealClockOut) {
        earlyLeavingDuration = idealClockOut - formattedClockOut;
      }

      // Overtime only occurs if the clockOut is after the idealClockOut time
      if (formattedClockOut > idealClockOut) {
        overtimeDuration = formattedClockOut - idealClockOut;
      }

      // Format durations
      const late = formatDuration(lateDuration);
      const earlyLeaving = formatDuration(earlyLeavingDuration);
      const overtime = formatDuration(overtimeDuration);

      // Create a new MarkedAttendance record
      const newMarkedAttendance = new MarkedAttendance({
        employeeId,
        date: formattedDate,
        status,
        clockIn: formattedClockIn,
        clockOut: formattedClockOut,
        late,
        earlyLeaving,
        overtime,
        hrs: totalWorkingHours,
      });

      await newMarkedAttendance.save();
      createdRecords.push(newMarkedAttendance);
    }

    return res.status(201).json({
      hasError: false,
      message: "MarkedAttendance record(s) created successfully",
      data: createdRecords,
    });
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
}

module.exports = create;
