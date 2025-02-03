const LeaveType = require("../../../models/LeaveType");

async function update(req, res) {
  try {
    const { leaveTypeName, daysPerYear } = req.body;
    const { id } = req.params;

    const leaveType = await LeaveType.findById(id);

    if (!leaveType) {
      return res.status(404).json({ message: "Leave Type not found." });
    }

    leaveType.leaveTypeName = leaveTypeName || leaveType.leaveTypeName;
    leaveType.daysPerYear = daysPerYear || leaveType.daysPerYear;

    await leaveType.save();

    return res.status(200).json({
      message: "Leave Type updated successfully!",
      leaveType,
    });
  } catch (error) {
    console.error("Error updating leave type:", error);
    return res.status(500).json({
      message: "Failed to update leave type.",
      error: error.message,
    });
  }
}

module.exports = update;
