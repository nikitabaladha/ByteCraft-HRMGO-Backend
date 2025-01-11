const Indicator = require("../../../models/Indicator");
const User = require("../../../models/User");
const Branch = require("../../../models/Branch");
const Department = require("../../../models/Department");
const Designation = require("../../../models/Designation");

async function getAll(req, res) {
  try {
    const indicators = await Indicator.find()
      .populate("branchId", "branchName")
      .populate("departmentId", "departmentName")
      .populate("designationId", "designationName")
      .populate("addedById", "name")
      .select("-__v");

    if (indicators.length === 0) {
      return res.status(404).json({ message: "No indicators found" });
    }

    const indicatorData = indicators.map((indicator) => ({
      id: indicator._id,
      branch: indicator.branchId?.branchName || "N/A",
      department: indicator.departmentId?.departmentName || "N/A",
      designation: indicator.designationId?.designationName || "N/A",
      addedBy: indicator.addedById ? `${indicator.addedById.name}` : "N/A",
      competencies: indicator.competencies || {},
      overAllRating: indicator.overAllRating || 0,
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
