const ManageLeave = require("../../../models/ManageLeave");
async function getAll(req, res) {
  try {
    const manageLeaves = await ManageLeave.find()
      .populate("employeeId", "name _id")
      .populate("leaveTypeId", "leaveTypeName _id");

    if (!manageLeaves.length) {
      return res.status(404).json({
        hasError: true,
        message: "No Leave found",
        data: [],
      });
    }

    const manageLeaveData = manageLeaves.map((manageLeave) => {
      return {
        id: manageLeave._id,
        employeeName: manageLeave?.employeeId?.name || "Unknown Employee",
        leaveTypeId: manageLeave?.leaveTypeId?._id || null,
        leaveType:
          manageLeave?.leaveTypeId?.leaveTypeName || "Unknown Leave Type",
        appliedOn: manageLeave.appliedOn,
        startDate: manageLeave.startDate,
        endDate: manageLeave.endDate,
        totalDays: manageLeave.totalDays,
        reason: manageLeave.reason,
        status: manageLeave.status,
      };
    });

    return res.status(200).json({
      message: "ManageLeaves retrieved successfully!",
      data: manageLeaveData,
    });
  } catch (error) {
    console.error("Error retrieving manageLeaves:", error);
    return res.status(500).json({
      message: "Failed to retrieve manage leaves.",
      error: error.message,
    });
  }
}

module.exports = getAll;
