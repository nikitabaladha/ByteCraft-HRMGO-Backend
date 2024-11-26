const Indicator = require("../../../models/Indicator");

async function deleteById(req, res) {
  try {
    const { id } = req.params; // Get the indicator ID from the route parameter

    // Find and delete the indicator by its ID
    const indicator = await Indicator.findByIdAndDelete(id);

    if (!indicator) {
      return res.status(404).json({ message: "Indicator not found" });
    }

    return res.status(200).json({
      message: "Indicator deleted successfully!",
      data: {
        id: indicator._id,
        branch: indicator.branchId,
        department: indicator.departmentId,
        designation: indicator.designationId,
      },
    });
  } catch (error) {
    console.error("Error deleting indicator:", error);
    return res.status(500).json({
      message: "Failed to delete indicator.",
      error: error.message,
    });
  }
}

module.exports = deleteById;
