const Indicator = require("../../../models/Indicator");
const User = require("../../../models/User");
const Branch = require("../../../models/Branch");
const Department = require("../../../models/Department");
const Designation = require("../../../models/Designation");

async function getAll(req, res) {
  try {
    // Fetch all indicators and populate the references for branchId, departmentId, designationId, and addedById
    const indicators = await Indicator.find()
      .populate("branchId", "branchName")
      .populate("departmentId", "departmentName")
      .populate("designationId", "designationName")
      .populate("addedById", "firstName lastName")
      .select("-__v");

    if (indicators.length === 0) {
      return res.status(404).json({ message: "No indicators found" });
    }

    // Map the indicators to include relevant information and return the response
    const indicatorData = indicators.map((indicator) => ({
      id: indicator._id,
      branch: indicator.branchId.branchName,
      department: indicator.departmentId.departmentName,
      designation: indicator.designationId.designationName,
      addedBy: `${indicator.addedById.firstName} ${indicator.addedById.lastName}`,
      competencies: indicator.competencies,
      overAllRating: indicator.overAllRating,
      createdAt: indicator.createdAt,
      updatedAt: indicator.updatedAt,
    }));

    return res.status(200).json({
      message: "Indicators retrieved successfully!",
      data: indicatorData,
    });
  } catch (error) {
    console.error("Error retrieving indicators:", error);
    return res.status(500).json({
      message: "Failed to retrieve indicators.",
      error: error.message,
    });
  }
}

module.exports = getAll;
