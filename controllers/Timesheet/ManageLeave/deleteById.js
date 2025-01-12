const ManageLeave = require("../../../models/ManageLeave");

async function deleteById(req, res) {
  const { id } = req.params;
  try {
    const deletedLeave = await ManageLeave.findByIdAndDelete(id);

    if (!deletedLeave) {
      return res.status(404).json({
        hasError: true,
        message: "Leave request not found.",
      });
    }

    return res.status(200).json({
      message: "Leave request deleted successfully.",
      data: deletedLeave,
    });
  } catch (error) {
    console.error("Error deleting leave request:", error);
    return res.status(500).json({
      hasError: true,
      message: "Failed to delete leave request.",
      error: error.message,
    });
  }
}

module.exports = deleteById;
