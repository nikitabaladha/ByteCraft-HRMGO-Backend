const TimeSheetValidator = require("../../../validators/Timesheet/TimeSheetValidator");

const TimeSheet = require("../../../models/TimeSheet");

async function create(req, res) {
  try {
    const { error } = TimeSheetValidator.validate(req.body);

    if (error?.details?.length) {
      const errorMessages = error.details.map((err) => err.message).join(", ");
      return res.status(400).json({ message: errorMessages });
    }

    const { employeeId, date, remark, hours } = req.body;

    const normalizedDate = new Date(date);
    normalizedDate.setUTCHours(0, 0, 0, 0);

    const existingTimeSheet = await TimeSheet.findOne({
      employeeId,
      date: normalizedDate,
    });

    if (existingTimeSheet) {
      return res.status(400).json({
        message: "An entry for this employee already exists on the given date.",
      });
    }

    const newTimeSheet = new TimeSheet({
      employeeId,
      date: normalizedDate,
      remark,
      hours,
    });

    await newTimeSheet.save();

    return res.status(201).json({
      message: "TimeSheet created successfully!",
      data: newTimeSheet,
      hasError: false,
    });
  } catch (error) {
    console.error("Error creating timeSheet:", error);
    return res.status(500).json({
      message: "Failed to create timeSheet.",
      error: error.message,
    });
  }
}

module.exports = create;
