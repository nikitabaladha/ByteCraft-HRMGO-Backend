const ManageLeave = require("../../../models/ManageLeave");

async function updateStatus(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ["Approved", "Reject", "Pending"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        message:
          "Invalid status. Status must be one of: Approved, Reject, Pending.",
        hasError: true,
      });
    }

    const updatedLeave = await ManageLeave.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedLeave) {
      return res.status(404).json({
        message: "Leave application not found.",
        hasError: true,
      });
    }

    return res.status(200).json({
      message: "Status updated successfully.",
      leave: updatedLeave,
      hasError: false,
    });
  } catch (error) {
    console.error("Error updating leave status:", error);
    return res.status(500).json({
      message: "Failed to update leave status.",
      error: error.message,
    });
  }
}

module.exports = updateStatus;
