const ManageLeaveValidator = require("../../../validators/Timesheet/ManageLeaveValidator");

const ManageLeave = require("../../../models/ManageLeave");

async function create(req, res) {
  try {
    const { error } = ManageLeaveValidator.validateCreate(req.body);

    if (error?.details?.length) {
      const errorMessages = error.details.map((err) => err.message).join(", ");
      return res.status(400).json({ message: errorMessages });
    }

    const { employeeId, leaveType, startDate, endDate, reason } = req.body;

    // Calculate the total days between startDate and endDate
    const start = new Date(startDate);
    const end = new Date(endDate);

    const timeDifference = end - start; // Difference in milliseconds
    const totalDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)) + 1;

    const appliedOn = new Date(
      Date.UTC(
        new Date().getUTCFullYear(),
        new Date().getUTCMonth(),
        new Date().getUTCDate(),
        0,
        0,
        0,
        0
      )
    );

    const formattedAppliedOn = appliedOn.toISOString();

    const existingLeave = await ManageLeave.findOne({
      employeeId,
      startDate,
      endDate,
    });

    if (existingLeave) {
      return res.status(400).json({
        message: "You have already applied for leave for the specified dates.",
        hasError: true,
      });
    }

    // Create a new leave instance
    const newManageLeave = new ManageLeave({
      employeeId,
      leaveType,
      appliedOn: formattedAppliedOn,
      startDate,
      endDate,
      totalDays, // Store the calculated totalDays
      reason,
    });

    // Save the leave to the database
    await newManageLeave.save();

    return res.status(201).json({
      message: "ManageLeave created successfully!",
      employee: newManageLeave,
      hasError: false,
    });
  } catch (error) {
    console.error("Error creating employee:", error);
    return res.status(500).json({
      message: "Failed to create employee.",
      error: error.message,
    });
  }
}

module.exports = create;
