const LeaveType = require("../../../models/LeaveType");

async function deleteLeaveType(req, res) {
  const { id } = req.params;

  try {
    const deletedLeaveType = await LeaveType.findByIdAndDelete(id);

    if (!deletedLeaveType) {
      return res.status(404).json({
        message: 'Leave Type not found',
      });
    }

    res.status(200).json({
      message: 'Leave Type deleted successfully',
      data: deletedLeaveType,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'An error occurred while deleting the leave type',
      error: error.message,
    });
  }
}

module.exports = deleteLeaveType;
