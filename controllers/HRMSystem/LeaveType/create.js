const LeaveType = require("../../../models/LeaveType");

async function create(req, res) {
  try {
    const { leaveTypeName, daysPerYear } = req.body;

    if (!leaveTypeName || !daysPerYear) {
      return res.status(400).json({
        message: "Leave Type Name and Days per Year are required.",
      });
    }

    if (isNaN(daysPerYear) || daysPerYear <= 0) {
      return res.status(400).json({
        message: "Days per Year must be a valid number greater than 0.",
      });
    }

    const newLeaveType = new LeaveType({
      leaveTypeName,
      daysPerYear,
    });

    await newLeaveType.save();

    return res.status(201).json({
      message: "Leave Type created successfully!",
      leaveType: newLeaveType,
    });
  } catch (error) {
    console.error("Error creating leave type:", error);
    return res.status(500).json({
      message: "Failed to create leave type.",
      error: error.message,
    });
  }
}

module.exports = create;
