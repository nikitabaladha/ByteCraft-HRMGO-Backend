const ManageLeave = require("../../../models/ManageLeave");

async function getAll(req, res) {
  try {
    const manageLeaves = await ManageLeave.find({
      status: { $ne: "Cancelled" },
    }).populate("employeeId", "name");

    const manageLeaveData = manageLeaves.map((manageLeave) => {
      return {
        leaveId: manageLeave._id,
        employeeName: manageLeave.employeeId.name,
        leaveType: manageLeave.leaveType,
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
