const TerminationType = require("../../../models/TerminationType");

async function deleteTerminationType(req, res) {
  const { id } = req.params;

  try {
    const deletedTerminationType = await TerminationType.findByIdAndDelete(id);

    if (!deletedTerminationType) {
      return res.status(404).json({
        message: "Termination Type not found",
      });
    }

    res.status(200).json({
      message: "Termination Type deleted successfully",
      data: deletedTerminationType,
    });
  } catch (error) {
    console.error("Error deleting termination type:", error);

    res.status(500).json({
      message: "An error occurred while deleting the termination type",
      error: error.message,
    });
  }
}

module.exports = deleteTerminationType;
