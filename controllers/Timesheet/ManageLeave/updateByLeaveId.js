const ManageLeaveValidator = require("../../../validators/Timesheet/ManageLeaveValidator");
const ManageLeave = require("../../../models/ManageLeave");

async function updateByLeaveId(req, res) {
  try {
    const { id } = req.params;

    const { error } = ManageLeaveValidator.validateUpdate(req.body);

    if (error?.details?.length) {
      const errorMessages = error.details.map((err) => err.message).join(", ");
      return res.status(400).json({ message: errorMessages });
    }

    const existingLeave = await ManageLeave.findById(id);

    if (!existingLeave) {
      return res.status(404).json({
        message: "Manage Leave entry not found.",
        hasError: true,
      });
    }

    const leaveTypeId = req.body.leaveTypeId || existingLeave.leaveTypeId;
    const startDate = req.body.startDate || existingLeave.startDate;
    const endDate = req.body.endDate || existingLeave.endDate;
    const reason = req.body.reason || existingLeave.reason;

    const totalDays = calculateTotalDays(startDate, endDate);

    const conflictingLeave = await ManageLeave.findOne({
      _id: { $ne: id },
      employeeId: existingLeave.employeeId,
      startDate,
      endDate,
    });

    if (conflictingLeave) {
      return res.status(400).json({
        message: "A leave already exists for the specified dates.",
        hasError: true,
      });
    }

    existingLeave.leaveTypeId = leaveTypeId;
    existingLeave.startDate = startDate;
    existingLeave.endDate = endDate;
    existingLeave.totalDays = totalDays;
    existingLeave.reason = reason;

    await existingLeave.save();

    return res.status(200).json({
      message: "ManageLeave updated successfully!",
      data: existingLeave,
      hasError: false,
    });
  } catch (error) {
    console.error("Error updating ManageLeave:", error);
    return res.status(500).json({
      message: "Failed to update ManageLeave.",
      error: error.message,
    });
  }
}

function calculateTotalDays(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const timeDiff = end - start;
  const days = timeDiff / (1000 * 3600 * 24);
  return days + 1;
}

module.exports = updateByLeaveId;
