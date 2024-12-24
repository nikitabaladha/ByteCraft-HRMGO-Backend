const LeaveType = require("../../../models/LeaveType");

async function getAll(req, res) {
  try {
    const leaveTypes = await LeaveType.find();

    if (leaveTypes.length === 0) {
      return res.status(404).json({
        hasError: true,
        message: "No Leave Types found",
      });
    }

    return res.status(200).json({
      hasError: false,
      message: "Leave Types fetched successfully",
      data: leaveTypes,
    });
  } catch (error) {
    console.error("Error fetching leave types:", error.message);
    return res.status(500).json({
      hasError: true,
      message: "Server error",
    });
  }
}

module.exports = getAll;
