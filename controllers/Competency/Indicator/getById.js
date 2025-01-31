const Indicator = require("../../../models/Indicator");

async function getById(req, res) {
  try {
    const { id } = req.params; // Get the indicatorId from the route parameter

    // Find the indicator by its ID and populate the necessary fields
    const indicator = await Indicator.findById(id)
      .populate("branchId", "branchName")
      .populate("departmentId", "departmentName")
      .populate("designationId", "designationName")
      .populate("addedById", "firstName lastName")
      .select("-__v");

    if (!indicator) {
      return res.status(404).json({ message: "Indicator not found" });
    }

    // Prepare the indicator data to send in the response
    const indicatorData = {
      id: indicator._id,
      branch: indicator.branchId.branchName,
      department: indicator.departmentId.departmentName,
      designation: indicator.designationId.designationName,
      addedBy: `${indicator.addedById.firstName} ${indicator.addedById.lastName}`,
      competencies: indicator.competencies,
      overAllRating: indicator.overAllRating,
      createdAt: indicator.createdAt,
      updatedAt: indicator.updatedAt,
    };

    return res.status(200).json({
      message: "Indicator retrieved successfully!",
      data: indicatorData,
    });
  } catch (error) {
    console.error("Error retrieving indicator:", error);
    return res.status(500).json({
      message: "Failed to retrieve indicator.",
      error: error.message,
    });
  }
}

module.exports = getById;
